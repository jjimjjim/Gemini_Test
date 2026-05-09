import { maxios } from "./axiosConfig";

export const getReplyByParentSeq = (seq) => maxios.get("/reply/" + seq);
export const postReply = (newReply) => maxios.post("/reply", newReply);