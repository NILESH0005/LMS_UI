import EditQuiz from "./EditQuiz";
import QuizTable from "./QuizTable";
import UpcomingQuiz from "./UpcomingQuiz";
const QuizPanel = () => {
  return (
    <>
    <QuizTable/>
      <EditQuiz />
      <UpcomingQuiz />  
    </>
  );
};

export default QuizPanel;