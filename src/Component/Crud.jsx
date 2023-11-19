import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import CrudChild from "./CrudChild";

function Crud() {
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);

  const getApiData = async () => {
    try {
      setError(false);
      const response = await axios.get(
        "https://6540cd4045bedb25bfc2a455.mockapi.io/posts"
      );
      setMyData(response.data);
      // console.log(myData);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  function createPost() {
    if (newTitle && newBody) {
      axios
        .post("https://6540cd4045bedb25bfc2a455.mockapi.io/posts", {
          title: newTitle,
          body: newBody,
        })
        .then((response) => {
          // setMyPost(response.data);
          setNewTitle("");
          setNewBody("");
          setMyData((prevData) => [response.data, ...prevData]);
        });
    } else {
      alert("please enter both value");
    }
    console.log(myData)
  }

  function handleDelete(postId) {
    axios
      .delete(`https://6540cd4045bedb25bfc2a455.mockapi.io/posts/${postId}`)
      .then(() => {
        const updatedData = myData.filter((post) => post.id !== postId);
        setMyData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  }
  function handleEdit(postId) {
    const postToEdit = myData.find((post) => post.id === postId);
    if (postToEdit) {
      setUpdateTitle(postToEdit.title);
      setUpdateBody(postToEdit.body);
      setEditingPostId(postId);
    }
  }

  function updatePost() {
    if (editingPostId) {
      axios
        .put(`https://6540cd4045bedb25bfc2a455.mockapi.io/posts/${editingPostId}`, {
          title: updateTitle,
          body: updateBody,
        })
        .then(() => {
          const updatedData = myData.map((post) =>
            post.id === editingPostId
              ? { ...post, title: updateTitle, body: updateBody }
              : post
          );
          setMyData(updatedData);
          setUpdateTitle("");
          setUpdateBody("");
          setEditingPostId(null);
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    }
  }

  if (error) {
    return <h1>Somethimg went wrong</h1>;
  }

  return (
    <>
    <div className="bg-[#36454F]">
    <div className="container mx-auto flex justify-between flex-wrap ">
        <div className="w-full flex flex-col justify-center mt-10  mx-auto item-center  ">
          <form
            className="border rounded flex w-[32%] text-black mx-auto  flex-col bg-[#87CEEB] text-center"
            action=""
          >
            <input
              className="px-2 py-2 w-[80%] font-serif rounded mx-auto mt-5 mb-5 border"
              type="text"
              placeholder="Enter A title "
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              className="px-2 py-2 w-[80%] mx-auto  font-serif rounded mb-5  border"
              type="text "
              placeholder="Details "
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />
            <button
              className="bg-[green] text-center  font-serif  rounded py-2 px-2 text-white  mb-5 mx-auto w-[20%]  "
              type="button"
              onClick={createPost}
            >
              Post
            </button>
          </form>
        </div>
        <ul className="container mx-auto flex flex-wrap  justify-between ">
          {myData.map((item) => (
            <li
              className="flex justify-between w-[32%] flex-col bg-[#87CEEB] rounded  mt-4 border  py-4 px-5 text-center"
              key={item.id}
            >
              {/* <h1 className="text-center ">{item.id}</h1> */}
              <h1 className="text-xl font-semibold mb-5 font-serif uppercase">
                {item.id === editingPostId ? (
                  <input
                  className="rounded py-2 px-2 "
                    type="text"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                  />
                ) : (
                  item.title.slice(0, 15)
                )}
              </h1>
              <p className="text-base font-serif capitalize ">
                {item.id === editingPostId ? (
                  <textarea className="w-[100%] rounded py-2 px-2"
                    value={updateBody}
                    onChange={(e) => setUpdateBody(e.target.value)}
                  />
                ) : (
                  item.body.slice(0, 100)
                )}
              </p>
              {/* <button onClick={() => handleDelete(item.id)}>Delete</button> */}
              {item.id === editingPostId ? (
                <button 
                className="bg-[green] text-center font-serif  rounded py-2 px-2 text-white mt-5  mb-5 mx-auto w-[20%]  "
                    type="button"
                onClick={updatePost}>Save</button>
              ) : (
                <>
                <div className="flex  item-center">
                <button
                    className="bg-[#6b1d6b] text-center  font-serif  rounded py-2 px-2 text-white  mb-5 mx-auto w-[20%]  "
                    type="button"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button 
                  className="bg-[red] text-center  font-serif  rounded py-2 px-2 text-white  mb-5 mx-auto w-[20%]  "
                  type="button"
                   onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
                  
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
      
    </>
  );
}

export default Crud;
