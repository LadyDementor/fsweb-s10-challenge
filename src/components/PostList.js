import Post from "./Post";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NOT_SIL, setNotes } from "../actions";
import PostForm from "./PostForm";
import { useDispatch, useSelector } from "react-redux";

const PostList = () => {
  const notlar = useSelector((store) => store.notlar);
  const dispatch = useDispatch();

  useEffect(() => {
    const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"));
    if (notesFromLocalStorage) {
      dispatch(setNotes(notesFromLocalStorage));
    }
  }, [dispatch]);

  return !notlar || notlar.length === 0 ? (
    <div className="beyazKutu text-center p-6">Hiç notunuz yok</div>
  ) : (
    <div>
      {notlar.map((not) => (
        <Post item={not} key={not.id} NOT_SIL={NOT_SIL} />
      ))}
      <PostForm />
    </div>
  );
};

export default PostList;
