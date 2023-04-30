import type { Question } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

const FlagQuestion: React.FC<{
  question: Question | null;
  onClose: () => void;
}> = ({ question, onClose }) => {
  const [{ issue, description }, setValues] = useState({
    issue: "question",
    description: "",
  });

  const ctx = api.useContext();

  const { mutate, isLoading } = api.flags.create.useMutation({
    onSuccess: () => {
      toast.success("Successfully flagged question");
      onClose();
      void ctx.questions.getAll.invalidate();
    },
    onError: (e) => {
      toast.error("There was an error flagging that question");
      console.warn(e);
    },
  });

  const handleInput = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setValues((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = (questionId: string) => {
    void mutate({
      questionId,
      issue,
      description,
    });
  };
  return (
    <div>
      <p>Question: {question?.question}</p>
      <p className="flex gap-2">
        Categories:{" "}
        {question?.category.split(",").map((cat, i) => (
          <span key={`cat-${cat}-${i}`}>{cat}</span>
        ))}
      </p>
      <p className="flex gap-2">
        Timeout: {Number(question?.timeout || 0) / 1000} seconds
      </p>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Issue</span>
        </label>
        <select
          name="issue"
          className="select-bordered select-primary select"
          value={issue}
          onChange={handleInput}
          disabled={isLoading}
        >
          <option value="question">Question Text</option>
          <option value="categories">Categories</option>
          <option value="timeout">Timeout (question length)</option>
        </select>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          name="description"
          className="textarea-bordered textarea-primary textarea h-24"
          placeholder="Type Here"
          value={description}
          onChange={handleInput}
          disabled={isLoading}
        ></textarea>
      </div>
      <br />
      <button
        className="btn-primary btn"
        onClick={() => handleSubmit(question?.id || "")}
      >
        Add Flag
      </button>
    </div>
  );
};

export default FlagQuestion;
