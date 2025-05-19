import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";



export default function WelcomeBanner() {

    const [username, setUsername] = useState(function() {
        const storedUsername = localStorage.getItem('username');
        return storedUsername ? JSON.parse(storedUsername) : 'User';
    });
    const [showEdit, setShowEdit] = useState(false);
    const [editName, setEditName] = useState(username);

    const editRef = useRef(null);

    useEffect(() => {
        if (!showEdit) return;

        function handleClickOutside(event) {
        if (editRef.current && !editRef.current.contains(event.target)) {
            setShowEdit(false);
        }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showEdit]);

    const handleUsernameChange = () => {
      if (editName.length > 20) {
        setEditName(editName.slice(0, 20));
        alert("Username cannot exceed 20 characters");
        return;
      }
      if (editName.length < 3) {
        setEditName("User");
        alert("Username must be at least 3 characters");
        return;
      }
    }
    return (
        <section id="home" className="w-full h-20 group bg-ft-primary/90 border-t-2 border-t-ft-accent rounded-md flex flex-col items-center justify-center relative mb-10">
          <h1 className="text-2xl font-medium text-ft-accent">Welcome <b>{username}</b></h1>
          <p className="text-base text-ft-bg">to your personal finance tracker</p>
          <button type='button' onClick={() => {setShowEdit(true)} } className="absolute top-2 right-2 bg-ft-accent text-ft-bg w-6 h-6 flex items-center justify-center rounded-md cursor-pointer [box-shadow:1px_1px_1px_black] hover:bg-ft-accent/80 active:scale-95 transition-all">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          {showEdit && (
            <form
              ref={editRef}
              className="absolute top-2 right-10 flex items-center gap-2 bg-ft-bg p-2 rounded shadow"
              onSubmit={e => {
                e.preventDefault();
                setUsername(editName);
                localStorage.setItem('username', JSON.stringify(editName));
                setShowEdit(false);
              }}
            >
              <input
                type="text"
                className="border rounded px-2 py-1 text-sm"
                value={editName}
                autoCapitalize="on"
                onChange={e => setEditName(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                onClick={handleUsernameChange}
                className="bg-ft-accent text-ft-bg px-2 py-1 rounded text-sm "
              >
                Save
              </button>
            </form>
          )}
        </section>
    )
}