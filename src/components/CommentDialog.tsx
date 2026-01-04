import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { MessageSquareIcon, StarIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInterviewerInfo } from "@/lib/utils";
import { format } from "date-fns";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

function CommentDialog({ interviewId }: { interviewId: Id<"interviews"> }) {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("3");

    const addComment = useMutation(api.comments.addComment);
    const users = useQuery(api.users.getUsers);
    const existingComments = useQuery(api.comments.getComments, {
        interviewId,
    });

    const handleSubmit = async () => {
        if (!comment.trim()) {
            return toast.error("Please enter comment");
        }

        try {
            await addComment({
                interviewId,
                content: comment.trim(),
                rating: parseInt(rating),
            });

            toast.success("Comment submitted");
            setComment("");
            setRating("3");
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to submit comment");
        }
    };

    const renderStars = (rating: number) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((starValue) => (
                <StarIcon
                    key={starValue}
                    className={`h-4 w-4 ${starValue <= rating ? "text-purple-500 fill-purple-500" : "text-gray-300 dark:text-gray-600"}`}
                />
            ))}
        </div>
    );

    if (existingComments === undefined || users === undefined) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger Button */}
            <DialogTrigger asChild>
                <Button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent shadow-none transition-colors whitespace-nowrap cursor-pointer">
                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                    Add Comment
                </Button>
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-800 rounded-xl p-6 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-700 shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Interview Comment
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {existingComments.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Previous Comments
                                </h4>
                                <Badge
                                    variant="outline"
                                    className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                                    {existingComments.length} Comment
                                    {existingComments.length !== 1 ? "s" : ""}
                                </Badge>
                            </div>

                            {/* Display Existing Comments */}
                            <ScrollArea className="h-60 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
                                <div className="space-y-4">
                                    {existingComments.map((comment, index) => {
                                        const interviewer = getInterviewerInfo(
                                            users,
                                            comment.interviewerId
                                        );
                                        return (
                                            <div
                                                key={index}
                                                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3 shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage
                                                                src={
                                                                    interviewer.image
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {
                                                                    interviewer.initials
                                                                }
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    interviewer.name
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {format(
                                                                    comment._creationTime,
                                                                    "MMM d, yyyy · h:mm a"
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {renderStars(
                                                        comment.rating
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add New Comment
                        </h3>

                        {/* Rating */}
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Rating
                            </Label>
                            <Select value={rating} onValueChange={setRating}>
                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-purple-500 shadow-none">
                                    <SelectValue placeholder="Select rating" />
                                </SelectTrigger>

                                <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <SelectItem
                                            key={value}
                                            value={value.toString()}
                                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <div className="flex items-center gap-2">
                                                {renderStars(value)}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Comment Input */}
                        <div className="space-y-2">
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Your Comment
                            </Label>
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your detailed comment about the candidate..."
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-purple-500 shadow-none resize-none h-32"
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6 pt-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-none h-auto">
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm h-auto">
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CommentDialog;
