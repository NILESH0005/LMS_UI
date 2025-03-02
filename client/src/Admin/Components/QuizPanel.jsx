import { useState } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import EditQuiz from "./EditQuiz";

const EventCMS = () => {
  const [events, setEvents] = useState([
    { title: "Tech Conference 2025", date: "2025-03-10", time: "10:00 AM", image: null, points: 50 },
    { title: "AI Workshop", date: "2025-04-05", time: "2:00 PM", image: null, points: 50 },
  ]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", image: null, points: 50 });
  const [quiz, setQuiz] = useState({ title: "", questions: [] });
  const [newQuestion, setNewQuestion] = useState({ question: "", options: [], correctAnswer: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, index = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (index !== null) {
          setEvents((prev) => {
            const updated = [...prev];
            updated[index].image = event.target.result;
            return updated;
          });
        } else {
          setNewEvent((prev) => ({ ...prev, image: event.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, newEvent]);
      setNewEvent({ title: "", date: "", time: "", image: null, points: 50 });
    } else {
      alert("Please fill in all fields for the event.");
    }
  };

  const addQuestion = () => {
    if (newQuestion.question && newQuestion.options.length > 0 && newQuestion.correctAnswer) {
      setQuiz((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));
      setNewQuestion({ question: "", options: [], correctAnswer: "" });
    } else {
      alert("Please fill in all fields for the question.");
    }
  };

  const handleQuizInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    setNewQuestion((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  return (
    <>
      <EditQuiz />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Manage Upcoming Events</h1>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="p-2 border rounded w-1/3"
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="p-2 border rounded w-1/4"
          />
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={handleInputChange}
            className="p-2 border rounded w-1/4"
          />
          <input type="file" onChange={(e) => handleImageUpload(e)} className="w-1/6" />
          <button onClick={addEvent} className="bg-blue-500 text-white p-2 rounded w-1/6">
            Add Event
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 relative">
              {event.image && <img src={event.image} alt="Event" className="w-full h-40 object-cover rounded mb-2" />}
              <input type="file" onChange={(e) => handleImageUpload(e, index)} className="mb-2" />
              <div className="flex items-center gap-4">
                <CalendarIcon className="h-10 w-10 text-blue-500" />
                <div>
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) =>
                      setEvents((prev) => {
                        const updated = [...prev];
                        updated[index].title = e.target.value;
                        return updated;
                      })
                    }
                    className="text-lg font-bold w-full border-b mb-2"
                  />
                  <div className="text-gray-600 text-sm flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-500" />
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) =>
                        setEvents((prev) => {
                          const updated = [...prev];
                          updated[index].date = e.target.value;
                          return updated;
                        })
                      }
                      className="w-full border-b"
                    />
                    <input
                      type="time"
                      value={event.time}
                      onChange={(e) =>
                        setEvents((prev) => {
                          const updated = [...prev];
                          updated[index].time = e.target.value;
                          return updated;
                        })
                      }
                      className="w-full border-b"
                    />
                  </div>
                </div>
              </div>
              <input
                type="number"
                value={event.points}
                onChange={(e) =>
                  setEvents((prev) => {
                    const updated = [...prev];
                    updated[index].points = parseInt(e.target.value, 10);
                    return updated;
                  })
                }
                className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold"
              />
            </div>
          ))}
        </div>

        {/* Create Quiz Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Quiz Title"
              value={quiz.title}
              onChange={handleQuizInputChange}
              className="p-2 border rounded w-full mb-4"
            />
            <div className="mb-4">
              <input
                type="text"
                name="question"
                placeholder="Question"
                value={newQuestion.question}
                onChange={handleQuestionInputChange}
                className="p-2 border rounded w-full mb-2"
              />
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={newQuestion.options[index] || ""}
                  onChange={(e) => handleOptionChange(e, index)}
                  className="p-2 border rounded w-full mb-2"
                />
              ))}
              <input
                type="text"
                name="correctAnswer"
                placeholder="Correct Answer"
                value={newQuestion.correctAnswer}
                onChange={handleQuestionInputChange}
                className="p-2 border rounded w-full mb-2"
              />
              <button onClick={addQuestion} className="bg-green-500 text-white p-2 rounded">
                Add Question
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Quiz Questions</h3>
            {quiz.questions.map((question, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 mb-4">
                <p className="font-bold">{question.question}</p>
                <ul className="list-disc pl-5">
                  {question.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
                <p className="text-sm text-green-600">Correct Answer: {question.correctAnswer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCMS;