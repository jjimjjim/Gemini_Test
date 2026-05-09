import React, { useEffect, useState } from 'react';
import styles from './Reply.module.css';
import { getReplyByParentSeq, postReply } from '../../api/replyApi';

const Reply = ({ seq }) => {
  const [reply, setReply] = useState([{
    seq: "",
    writer: "",
    contents: "",
    write_date: ""
  }]);
  const [comment, setComment] = useState("");


  useEffect(() => {
    getReplyByParentSeq(seq).then(resp => {
      setReply(resp.data);
    })
  }, []);


  const handleAddReply = () => {
    if (comment === "" || comment === null) {
      alert("댓글을 먼저 작성해 주세요.");
      return;
    }
    
    const newReply = {
      parent_seq: seq,
      writer: "김수빈",
      contents: comment
    }

    postReply(newReply).then(() => {
      getReplyByParentSeq(seq).then(resp => {
        setReply(resp.data);
      })
      setComment("");
    })
  };

  return (
    <div className={styles.replyContainer}>
      <div className={styles.inputSection}>
        <textarea
          className={styles.textarea}
          placeholder="댓글을 입력해주세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)} />
        <button className={styles.submitBtn} onClick={handleAddReply}>
          등록
        </button>
      </div>

      <div className={styles.replyList}>
        {reply.map((reply) => (
          <div key={reply.seq} className={styles.replyItem}>
            <div className={styles.mainContent}>
              <div className={styles.author}>{reply.writer}</div>
              <div className={styles.content}>{reply.contents}</div>
            </div>
            <div className={styles.sideContent}>
              <div className={styles.date}>{reply.write_date.substring(0, 10)}</div>
              <div className={styles.buttonGroup}>
                <button className={styles.editBtn}>수정</button>
                <button className={styles.deleteBtn}>삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reply;
