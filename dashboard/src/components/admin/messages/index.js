import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/message/admin/messages", {
        withCredentials: true,
      });

      if (res.data && Array.isArray(res.data.messages)) {
        setMessages(res.data.messages);
      } else {
        setMessages([]);
      }
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Failed to load messages.");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  // Delete a message
  const handleDelete = async (id) => {
    try {
      setMessageId(id);
      setLoading(true);

      const res = await axios.delete(`http://localhost:8000/api/message/admin/delete/${id}`, {
        withCredentials: true,
      });

      setSuccessMsg(res.data.message || "Message deleted");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchMessages(); // Refresh list
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Failed to delete message.");
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Return to Dashboard
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMsg}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-4 rounded-lg shadow-md space-y-2"
            >
              <p className="text-gray-800">
                <strong>Sender Name:</strong> {msg.senderName}
              </p>
              <p className="text-gray-800">
                <strong>Subject:</strong> {msg.subject}
              </p>
              <p className="text-gray-800">
                <strong>Message:</strong> {msg.message}
              </p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(msg._id)}
                  disabled={loading && messageId === msg._id}
                  className={`${
                    loading && messageId === msg._id
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white px-4 py-2 rounded`}
                >
                  {loading && messageId === msg._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            No messages found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
