import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { CODING_QUESTIONS, LANGUAGES } from "@/constants";

export type CodeLanguage = "javascript" | "python" | "java";

interface CodeState {
    questionId: string;
    language: CodeLanguage;
    code: string;
}

// Wait this long after the last keystroke before sending, so we don't write on every key
const SAVE_DELAY_MS = 300;

const defaultState = (): CodeState => {
    const language = LANGUAGES[0].id;
    return {
        questionId: CODING_QUESTIONS[0].id,
        language,
        code: CODING_QUESTIONS[0].starterCode[language],
    };
};

// Keeps the code editor (question, language, code) in sync for everyone in the same call.
// Without a callId it behaves like a normal local editor.
export const useSharedCode = (callId?: string) => {
    const { user } = useUser();
    const myId = user?.id;

    const session = useQuery(
        api.codeSessions.getCodeSession,
        callId ? { streamCallId: callId } : "skip"
    );
    const saveSession = useMutation(api.codeSessions.updateCodeSession);

    const [state, setState] = useState<CodeState>(defaultState);

    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const unsavedState = useRef<CodeState | null>(null);
    const hasLoadedSession = useRef(false);

    const flush = useCallback(() => {
        if (saveTimer.current) {
            clearTimeout(saveTimer.current);
            saveTimer.current = null;
        }

        const next = unsavedState.current;
        unsavedState.current = null;

        if (callId && next) {
            saveSession({ streamCallId: callId, ...next }).catch(console.error);
        }
    }, [callId, saveSession]);

    // Apply changes made by the other participant
    useEffect(() => {
        if (!session) return;

        // Our own writes echo back — ignore them (except once on first load, e.g. after a refresh)
        if (session.updatedBy === myId && hasLoadedSession.current) return;

        hasLoadedSession.current = true;

        // Their newer version wins over our not-yet-sent keystrokes
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = null;
        unsavedState.current = null;

        setState({
            questionId: session.questionId,
            language: session.language,
            code: session.code,
        });
    }, [session, myId]);

    // Send any pending edit when leaving the call
    useEffect(() => flush, [flush]);

    const update = (next: CodeState, immediate: boolean) => {
        setState(next);
        unsavedState.current = next;

        if (immediate) {
            flush();
            return;
        }

        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(flush, SAVE_DELAY_MS);
    };

    const question =
        CODING_QUESTIONS.find((q) => q.id === state.questionId) ??
        CODING_QUESTIONS[0];

    return {
        question,
        language: state.language,
        code: state.code,
        // Switching question or language resets to the starter code for everyone
        changeQuestion: (questionId: string) => {
            const next = CODING_QUESTIONS.find((q) => q.id === questionId);
            if (!next) return;
            update(
                {
                    questionId,
                    language: state.language,
                    code: next.starterCode[state.language],
                },
                true
            );
        },
        changeLanguage: (language: CodeLanguage) =>
            update(
                {
                    questionId: question.id,
                    language,
                    code: question.starterCode[language],
                },
                true
            ),
        changeCode: (code: string) => update({ ...state, code }, false),
    };
};
