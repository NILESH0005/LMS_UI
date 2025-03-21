import { validationResult } from "express-validator";
import { connectToDatabase, closeConnection } from "../database/mySql.js";
import { logError, logInfo, logWarning, queryAsync } from "../helper/index.js";

export const createQuiz = async (req, res) => {
  let success = false;
  const userId = req.user.id;

  console.log("User ID:", userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logWarning("Data is not in the right format");
    return res.status(400).json({ success, data: errors.array(), message: "Data is not in the right format" });
  }

  try {
    let {
      category,
      name,
      level,
      duration,
      negativeMarking,
      startDate,
      startTime,
      endDate,
      endTime,
      type,
      quizVisibility,
    } = req.body;

    console.log("Request Body:", req.body);

    if (!name || !startDate || !startTime || !endDate || !endTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let startDateAndTime = `${startDate} ${startTime}`;
    let endDateTime = `${endDate} ${endTime}`;

    category = category ?? null;
    name = name ?? null;
    level = level ?? null;
    duration = duration ?? null;
    negativeMarking = negativeMarking ?? false;
    startDateAndTime = startDateAndTime ?? null;
    endDateTime = endDateTime ?? null;
    type = type ?? null;
    quizVisibility = quizVisibility ?? "Public";

    connectToDatabase(async (err, conn) => {
      if (err) {
        logError("Failed to connect to database");
        return res.status(500).json({ success: false, message: "Failed to connect to database" });
      }
      logInfo("Database connection established successfully");

      try {
        const userQuery = `SELECT UserID, Name, isAdmin FROM Community_User WHERE ISNULL(delStatus, 0) = 0 AND EmailId = ?`;
        const userRows = await queryAsync(conn, userQuery, [userId]);
        console.log("User Rows:", userRows);

        if (userRows.length === 0) {
          logWarning("User not found, please login first.");
          return res.status(400).json({ success: false, message: "User not found, please login first." });
        }

        const user = userRows[0];
        const authAdd = user.Name;
        const authDel = null;
        const authLstEdit = null;

        // Insert quiz data
        const quizQuery = `
          INSERT INTO QuizDetails 
          (QuizCategory, QuizName, QuizLevel, QuizDuration, NegativeMarking, StartDateAndTime, EndDateTime, QuizVisibility, AuthAdd, AuthDel, AuthLstEdit, AddOnDt, delStatus) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE(), 0);
        `;
        console.log("Executing query: ", quizQuery);

        await queryAsync(conn, quizQuery, [
          category,
          name,
          level,
          duration,
          negativeMarking,
          startDateAndTime,
          endDateTime,
          quizVisibility,
          authAdd,
          authDel,
          authLstEdit,
        ]);

        // Fetch last inserted Quiz ID
        const lastInsertedIdQuery = `SELECT TOP 1 QuizID FROM QuizDetails WHERE ISNULL(delStatus, 0) = 0 ORDER BY QuizID DESC;`;
        const lastInsertedId = await queryAsync(conn, lastInsertedIdQuery);
        console.log("Last Inserted ID:", lastInsertedId);

        success = true;
        logInfo("Quiz created successfully!");
        return res.status(200).json({
          success,
          data: { quizId: lastInsertedId[0].QuizID },
          message: "Quiz created successfully!",
        });
      } catch (queryErr) {
        logError("Database Query Error:", queryErr.message || queryErr);
        return res.status(500).json({ success: false, message: "Database Query Error" });
      } finally {
        closeConnection(conn);
      }
    });
  } catch (error) {
    logError("Unexpected Error:", error.stack || JSON.stringify(error));
    console.error("Error Details:", error); // This will log to your console
    return res.status(500).json({ success: false, message: "Unexpected Error, check logs" });
  }
};

export const getQuizzes = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const warningMessage = "Data is not in the right format";
    console.error(warningMessage, errors.array());
    logWarning(warningMessage);
    res.status(400).json({ success, data: errors.array(), message: warningMessage });
    return;
  }

  try {
    connectToDatabase(async (err, conn) => {
      if (err) {
        const errorMessage = "Failed to connect to database";
        logError(err);
        res.status(500).json({ success: false, data: err, message: errorMessage });
        return;
      }

      try {
        const query = `SELECT QuizID, QuizCategory, QuizName, QuizLevel, QuizDuration, NegativeMarking, StartDateAndTime, EndDateTime, QuizVisibility FROM QuizDetails WHERE ISNULL(delStatus, 0) = 0 ORDER BY AddOnDt DESC`;
        const quizzes = await queryAsync(conn, query);

        success = true;
        closeConnection();
        const infoMessage = "Quizzes fetched successfully";
        logInfo(infoMessage);
        res.status(200).json({ success, data: { quizzes }, message: infoMessage });
      } catch (queryErr) {
        logError(queryErr);
        closeConnection();
        res.status(500).json({ success: false, data: queryErr, message: 'Something went wrong please try again' });
      }
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, data: {}, message: 'Something went wrong please try again' });
  }
};

export const deleteQuiz = (req, res) => {
  let success = false;
  const { QuizID } = req.body;
  const adminName = req.user?.id;

  try {
    connectToDatabase(async (err, conn) => {
      if (err) {
        logError(err);
        return res.status(500).json({
          success: false,
          data: err,
          message: "Database connection error.",
        });
      }

      try {
        const checkQuery = `SELECT * FROM QuizDetails WHERE QuizID = ? AND (delStatus IS NULL OR delStatus = 0)`;
        const result = await queryAsync(conn, checkQuery, [QuizID]);

        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Quiz not found or already deleted.",
          });
        }
        const updateQuery = `
          UPDATE QuizDetails 
          SET 
            delStatus = 1, 
            delOnDt = GETDATE(), 
            AuthDel = ? 
          OUTPUT 
            inserted.QuizID, 
            inserted.delStatus, 
            inserted.delOnDt, 
            inserted.AuthDel 
          WHERE 
            QuizID = ? AND (delStatus IS NULL OR delStatus = 0)
        `;

        const rows = await queryAsync(conn, updateQuery, [adminName, QuizID]);

        if (rows.length > 0) {
          success = true;
          logInfo("Quiz deleted successfully");
          return res.status(200).json({
            success,
            data: {
              QuizID: rows[0].QuizID,
              AuthDel: rows[0].AuthDel,
              delOnDt: rows[0].delOnDt,
              delStatus: rows[0].delStatus,
            },
            message: "Quiz deleted successfully.",
          });
        } else {
          logWarning("Failed to delete the quiz.");
          return res.status(404).json({
            success: false,
            message: "Failed to delete the quiz.",
          });
        }
      } catch (updateErr) {
        logError(updateErr);
        return res.status(500).json({
          success: false,
          data: updateErr,
          message: "Error updating quiz deletion.",
        });
      }
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      success: false,
      message: "Unable to connect to the database!",
    });
  }
};

export const createQuestion = async (req, res) => {
  let success = false;
  const userId = req.user.id;
  console.log("User ID:", userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, data: errors.array(), message: "Data is not in the right format" });
  }

  try {
    const { question_text, Ques_level, image, group_id, options } = req.body;

    if (!question_text || !Ques_level || !group_id || !options || options.length < 2) {
      return res.status(400).json({ success, message: "Missing required fields or insufficient options." });
    }

    connectToDatabase(async (err, conn) => {
      if (err) {
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }

      try {
        const insertQuestionQuery = `
          INSERT INTO Questions 
          (question_text, Ques_level, image, group_id, AuthAdd, AddOnDt, delStatus) 
          VALUES (?, ?, ?, ?, ?, GETDATE(), 0);
        `;
        const questionResult = await queryAsync(conn, insertQuestionQuery, [
          question_text, Ques_level, image, group_id, userId
        ]);

        const lastQuestionIdQuery = `SELECT TOP 1 id FROM Questions ORDER BY id DESC;`;
        const lastQuestionIdResult = await queryAsync(conn, lastQuestionIdQuery);
        const questionId = lastQuestionIdResult[0].id;

        for (const option of options) {
          const { option_text, is_correct, image } = option;
          const insertOptionQuery = `
            INSERT INTO QuestionOptions 
            (question_id, option_text, is_correct, image, AuthAdd, AddOnDt, delStatus) 
            VALUES (?, ?, ?, ?, ?, GETDATE(), 0);
          `;
          await queryAsync(conn, insertOptionQuery, [
            questionId, option_text, is_correct ? 1 : 0, image, userId
          ]);
        }

        success = true;
        closeConnection();
        return res.status(200).json({
          success,
          data: { questionId },
          message: "Question and options added successfully!"
        });
      } catch (queryErr) {
        closeConnection();
        console.error("Database Query Error:", queryErr);
        return res.status(500).json({ success: false, data: queryErr, message: "Database Query Error" });
      }
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).json({ success: false, data: error, message: "Unexpected Error, check logs" });
  }
};

export const getQuestion = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const warningMessage = "Data is not in the right format";
    console.error(warningMessage, errors.array());
    logWarning(warningMessage);
    res.status(400).json({ success, data: errors.array(), message: warningMessage });
    return;
  }

  try {
    connectToDatabase(async (err, conn) => {
      if (err) {
        const errorMessage = "Failed to connect to database";
        logError(err);
        res.status(500).json({ success: false, data: err, message: errorMessage });
        return;
      }

      try {
        const query = `select question_text,GroupMaster.group_name,tblDDReferences.ddValue,option_text, 0 as count
                          from Questions
                          left join GroupMaster on Questions.group_id = GroupMaster.group_id
                          left join tblDDReferences on Questions.Ques_level = tblDDReferences.idCode
                          left join QuestionOptions on Questions.id = QuestionOptions.question_id
                          where QuestionOptions.is_correct = 1 and isnull(Questions.delStatus,0)=0 ORDER BY Questions.AddOnDt DESC;`;
        const quizzes = await queryAsync(conn, query);

        success = true;
        closeConnection();
        const infoMessage = "Questions fetched successfully";
        logInfo(infoMessage);
        res.status(200).json({ success, data: { quizzes }, message: infoMessage });
      } catch (queryErr) {
        logError(queryErr);
        closeConnection();
        res.status(500).json({ success: false, data: queryErr, message: 'Something went wrong please try again' });
      }
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, data: {}, message: 'Something went wrong please try again' });
  }
};

export const deleteQuestion = async (req, res) => {
  let success = false;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const warningMessage = "Data is not in the right format";
    console.error(warningMessage, errors.array());
    logWarning(warningMessage);
    res.status(400).json({ success, data: errors.array(), message: warningMessage });
    return;
  }

  const { questionId } = req.body; // Assuming the question ID is sent in the request body

  if (!questionId) {
    const errorMessage = "Question ID is required";
    logError(errorMessage);
    res.status(400).json({ success, data: {}, message: errorMessage });
    return;
  }

  try {
    connectToDatabase(async (err, conn) => {
      if (err) {
        const errorMessage = "Failed to connect to database";
        logError(err);
        res.status(500).json({ success: false, data: err, message: errorMessage });
        return;
      }

      try {
        const query = `UPDATE Questions SET delStatus = 1 WHERE id = ?`;
        const result = await queryAsync(conn, query, [questionId]);

        if (result.affectedRows > 0) {
          success = true;
          const infoMessage = "Question deleted successfully";
          logInfo(infoMessage);
          res.status(200).json({ success, data: { questionId }, message: infoMessage });
        } else {
          const notFoundMessage = "No question found with the provided ID";
          logWarning(notFoundMessage);
          res.status(404).json({ success, data: {}, message: notFoundMessage });
        }

        closeConnection();
      } catch (queryErr) {
        logError(queryErr);
        closeConnection();
        res.status(500).json({ success: false, data: queryErr, message: "Something went wrong, please try again" });
      }
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, data: {}, message: "Something went wrong, please try again" });
  }
};
