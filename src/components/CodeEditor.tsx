import { CODING_QUESTIONS, LANGUAGES } from "@/constants";
import { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircleIcon, BookIcon, LightbulbIcon } from "lucide-react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
    const [selectedQuestion, setSelectedQuestion] = useState(
        CODING_QUESTIONS[0]
    );
    const [language, setLanguage] = useState<"javascript" | "python" | "java">(
        LANGUAGES[0].id
    );
    const [code, setCode] = useState(selectedQuestion.starterCode[language]);

    // Function to handle question change
    const handleQuestionChange = (questionId: string) => {
        const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
        setSelectedQuestion(question);
        setCode(question.starterCode[language]);
    };

    // Function to handle language change
    const handleLanguageChange = (
        newLanguage: "javascript" | "python" | "java"
    ) => {
        setLanguage(newLanguage);
        setCode(selectedQuestion.starterCode[newLanguage]);
    };

    return (
        <ResizablePanelGroup
            direction="vertical"
            className="min-h-[calc(100vh-4rem-1px)] bg-gray-50 dark:bg-gray-900">
            {/* Problem Section */}
            <ResizablePanel>
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <div className="max-w-4xl mx-auto space-y-6">
                            {/* Problem Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {/* <h2 className="text-2xl font-semibold tracking-tight">
                                            {selectedQuestion.title}
                                        </h2> */}
                                        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {selectedQuestion.title}
                                        </h2>
                                    </div>
                                    {/* <p className="text-sm text-muted-foreground">
                                        Choose your language and solve the
                                        problem
                                    </p> */}
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Choose your language and solve the
                                        problem
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Question Select */}
                                    <Select
                                        value={selectedQuestion.id}
                                        onValueChange={handleQuestionChange}>
                                        {/* <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select question" />
                                        </SelectTrigger> */}
                                        <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm focus:ring-purple-500">
                                            <SelectValue placeholder="Select question" />
                                        </SelectTrigger>
                                        {/* <SelectContent>
                                            {CODING_QUESTIONS.map((q) => (
                                                <SelectItem
                                                    key={q.id}
                                                    value={q.id}>
                                                    {q.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent> */}
                                        <SelectContent className="!bg-white dark:!bg-gray-800 border-gray-200 dark:border-gray-700">
                                            {CODING_QUESTIONS.map((q) => (
                                                <SelectItem
                                                    key={q.id}
                                                    value={q.id}
                                                    className="cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700">
                                                    {q.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {/* Language Select */}
                                    <Select
                                        value={language}
                                        onValueChange={handleLanguageChange}>
                                        {/* <SelectTrigger className="w-[150px]"> */}
                                        <SelectTrigger className="w-[150px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm focus:ring-purple-500">
                                            {/* SELECT VALUE */}
                                            <SelectValue>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={`/${language}.png`}
                                                        alt={language}
                                                        className="w-5 h-5 object-contain"
                                                    />
                                                    {
                                                        LANGUAGES.find(
                                                            (l) =>
                                                                l.id ===
                                                                language
                                                        )?.name
                                                    }
                                                </div>
                                            </SelectValue>
                                        </SelectTrigger>

                                        {/* SELECT CONTENT */}
                                        {/* <SelectContent>
                                            {LANGUAGES.map((lang) => (
                                                <SelectItem
                                                    key={lang.id}
                                                    value={lang.id}>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={`/${lang.id}.png`}
                                                            alt={lang.name}
                                                            className="w-5 h-5 object-contain"
                                                        />
                                                        {lang.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent> */}
                                        <SelectContent className="!bg-white dark:!bg-gray-800 border-gray-200 dark:border-gray-700">
                                            {LANGUAGES.map((lang) => (
                                                <SelectItem
                                                    key={lang.id}
                                                    value={lang.id}
                                                    className="cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={`/${lang.id}.png`}
                                                            alt={lang.name}
                                                            className="w-5 h-5 object-contain"
                                                        />
                                                        {lang.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Problem Description */}
                            {/* <Card>
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <BookIcon className="h-5 w-5 text-primary/80" />
                                    <CardTitle>Problem Description</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm leading-relaxed">
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <p className="whitespace-pre-line">
                                            {selectedQuestion.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card> */}
                            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <BookIcon className="h-5 w-5 text-purple-500" />
                                    <CardTitle className="text-gray-900 dark:text-white">
                                        Problem Description
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <p className="whitespace-pre-line">
                                            {selectedQuestion.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Problem Examples */}
                            {/* <Card>
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                                    <CardTitle>Examples</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-full w-full rounded-md border">
                                        <div className="p-4 space-y-4">
                                            {selectedQuestion.examples.map(
                                                (example, index) => (
                                                    <div
                                                        key={index}
                                                        className="space-y-2">
                                                        <p className="font-medium text-sm">
                                                            Example {index + 1}:
                                                        </p>
                                                        <ScrollArea className="h-full w-full rounded-md">
                                                            <pre className="bg-muted/50 p-3 rounded-lg text-sm font-mono">
                                                                <div>
                                                                    Input:{" "}
                                                                    {
                                                                        example.input
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Output:{" "}
                                                                    {
                                                                        example.output
                                                                    }
                                                                </div>
                                                                {example.explanation && (
                                                                    <div className="pt-2 text-muted-foreground">
                                                                        Explanation:{" "}
                                                                        {
                                                                            example.explanation
                                                                        }
                                                                    </div>
                                                                )}
                                                            </pre>
                                                            <ScrollBar orientation="horizontal" />
                                                        </ScrollArea>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <ScrollBar />
                                    </ScrollArea>
                                </CardContent>
                            </Card> */}
                            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                                    <CardTitle className="text-gray-900 dark:text-white">
                                        Examples
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-full w-full rounded-md border border-gray-100 dark:border-gray-700">
                                        <div className="p-4 space-y-4">
                                            {selectedQuestion.examples.map(
                                                (example, index) => (
                                                    <div
                                                        key={index}
                                                        className="space-y-2">
                                                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                                                            Example {index + 1}:
                                                        </p>
                                                        <ScrollArea className="h-full w-full rounded-md">
                                                            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200">
                                                                <div>
                                                                    Input:{" "}
                                                                    {
                                                                        example.input
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Output:{" "}
                                                                    {
                                                                        example.output
                                                                    }
                                                                </div>
                                                                {example.explanation && (
                                                                    <div className="pt-2 text-gray-500 dark:text-gray-400">
                                                                        Explanation:{" "}
                                                                        {
                                                                            example.explanation
                                                                        }
                                                                    </div>
                                                                )}
                                                            </pre>
                                                            <ScrollBar orientation="horizontal" />
                                                        </ScrollArea>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <ScrollBar />
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            {/* Constraints */}
                            {selectedQuestion.constraints && (
                                // <Card>
                                //     <CardHeader className="flex flex-row items-center gap-2">
                                //         <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                                //         <CardTitle>Constraints</CardTitle>
                                //     </CardHeader>
                                //     <CardContent>
                                //         <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-muted-foreground">
                                //             {selectedQuestion.constraints.map(
                                //                 (constraint, index) => (
                                //                     <li
                                //                         key={index}
                                //                         className="text-muted-foreground">
                                //                         {constraint}
                                //                     </li>
                                //                 )
                                //             )}
                                //         </ul>
                                //     </CardContent>
                                // </Card>
                                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
                                    <CardHeader className="flex flex-row items-center gap-2">
                                        <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                                        <CardTitle className="text-gray-900 dark:text-white">
                                            Constraints
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-gray-400">
                                            {selectedQuestion.constraints.map(
                                                (constraint, index) => (
                                                    <li
                                                        key={index}
                                                        className="text-gray-600 dark:text-gray-400"
                                                    >
                                                        {constraint}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </ResizablePanel>

            {/* Vertical Handle */}
            <ResizableHandle
                withHandle
                className="bg-gray-200 dark:bg-gray-700"
            />

            {/* Code Editor */}
            <ResizablePanel defaultSize={60} maxSize={100}>
                <div className="h-full relative bg-gray-900">
                    <Editor
                        height={"100%"}
                        defaultLanguage={language}
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 16,
                            lineNumbers: "on",
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 16, bottom: 16 },
                            wordWrap: "on",
                            wrappingIndent: "indent",
                        }}
                    />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}

export default CodeEditor;
