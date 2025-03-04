import { validationResult } from 'express-validator';
import { connectToDatabase, closeConnection } from '../database/mySql.js';
import dotenv from 'dotenv'
import { logError, queryAsync, logInfo, logWarning } from '../helper/index.js';



dotenv.config()

export const addParallaxText = async (req, res) => {
  let success = false;
  console.log("fvdf", req.header)
  const userId = req.user.id;
  console.log("user:", userId);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logWarning("Data is not in the right format");
    return res.status(400).json({ success, data: errors.array(), message: "Data is not in the right format" });
  }

  try {
    let { componentName, componentIdName, content } = req.body;

    connectToDatabase(async (err, conn) => {
      if (err) {
        logError("Failed to connect to database");
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }

      try {
        // Fetch user details
        const userQuery = `SELECT UserID, Name, isAdmin FROM Community_User WHERE ISNULL(delStatus, 0) = 0 AND EmailId = ?`;
        const userRows = await queryAsync(conn, userQuery, [userId]);

        if (userRows.length > 0) {
          const user = userRows[0];
          const insertQuery = `INSERT INTO tblCMSContent  (ComponentName, ComponentIdName, Content,  AuthAdd, AddOnDt, delStatus)
                          VALUES (?, ?, ?,  ?, GETDATE(), 0);
                      `;

          const insertResult = await queryAsync(conn, insertQuery, [
            componentName, componentIdName, content, user.Name
          ]);

          success = true;
          closeConnection();
          logInfo("Parallax text added successfully!");

          return res.status(200).json({
            success,
            data: { id: insertResult.insertId },
            message: "Parallax text added successfully!",
          });
        } else {
          closeConnection();
          logWarning("User not found, please login first.");
          return res.status(400).json({ success: false, data: {}, message: "User not found, please login first." });
        }
      } catch (queryErr) {
        closeConnection();
        logError("Database Query Error: ", queryErr);
        return res.status(500).json({ success: false, data: queryErr, message: "Database Query Error" });
      }
    });
  } catch (error) {
    logError("Unexpected Error: ", error);
    return res.status(500).json({ success: false, data: error, message: "Unexpected Error, check logs" });
  }
};

export const addContentSection = async (req, res) => {
  let success = false;
  console.log("Headers:", req.headers);
  const userId = req.user.id;
  console.log("User ID:", userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logWarning("Data is not in the right format");
    return res.status(400).json({ success, data: errors.array(), message: "Data is not in the right format" });
  }

  try {
    const { componentName, componentIdName, title, text, image } = req.body;

    connectToDatabase(async (err, conn) => {
      if (err) {
        logError("Failed to connect to database");
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }

      try {
        // Fetch user details
        const userQuery = `SELECT UserID, Name FROM Community_User WHERE ISNULL(delStatus, 0) = 0 AND EmailId = ?`;
        const userRows = await queryAsync(conn, userQuery, [userId]);

        if (userRows.length > 0) {
          const user = userRows[0];

          const insertQuery = `INSERT INTO tblCMSContent (ComponentName, ComponentIdName, Title, Content, Image, AuthAdd, AddOnDt, delStatus)  VALUES (?, ?, ?, ?, ?, ?, GETDATE(), 0);`;
          const insertResult = await queryAsync(conn, insertQuery, [
            componentName, componentIdName, title, text, image, user.Name
          ]);

          success = true;
          closeConnection();
          logInfo("Content added successfully!");

          return res.status(200).json({
            success,
            data: { id: insertResult.insertId },
            message: "Content added successfully!",
          });
        } else {
          closeConnection();
          logWarning("User not found, please login first.");
          return res.status(400).json({ success: false, data: {}, message: "User not found, please login first." });
        }
      } catch (queryErr) {
        closeConnection();
        logError("Database Query Error:", queryErr);
        return res.status(500).json({ success: false, data: queryErr, message: "Database Query Error" });
      }
    });
  } catch (error) {
    logError("Unexpected Error:", error);
    return res.status(500).json({ success: false, data: error, message: "Unexpected Error, check logs" });
  }
};

export const addNewsSection = async (req, res) => {
  let success = false;
  console.log("header here:", req.headers)
  const userId = req.user.id;
  console.log("User Id:", userId)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logWarning("Data is not in the right format");
    return res.status(400).json({ success, data: errors.array(), message: "Data is not in the right format" });
  }

  try {
    const { componentName, componentIdName, title, location, image } = req.body;

    connectToDatabase(async (err, conn) => {
      if (err) {
        logError("Failed to connect to database");
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }

      try {
        // Fetch user details
        const userQuery = `SELECT UserID, Name FROM Community_User WHERE ISNULL(delStatus, 0) = 0 AND EmailId = ?`;
        const userRows = await queryAsync(conn, userQuery, [userId]);

        if (userRows.length > 0) {
          const user = userRows[0];

          // Insert news into the tblCMSContent table
          const insertQuery = `INSERT INTO tblCMSContent (ComponentName, ComponentIdName, Title, Location, Image, AuthAdd, AddOnDt, delStatus) VALUES (?, ?, ?, ?, ?, ?, GETDATE(), 0);`;

          const content = JSON.stringify({ title, location }); // Store news data as JSON
          console.log("inserted data", content)

          const insertResult = await queryAsync(conn, insertQuery, [
            componentName, componentIdName, title, location, image, user.Name
          ]);

          success = true;
          closeConnection();
          logInfo("News added successfully!");

          return res.status(200).json({
            success,
            data: { id: insertResult.insertId },
            message: "News added successfully!",
          });
        } else {
          closeConnection();
          logWarning("User not found, please login first.");
          return res.status(400).json({ success: false, data: {}, message: "User not found, please login first." });
        }
      } catch (queryErr) {
        closeConnection();
        logError("Database Query Error: ", queryErr);
        return res.status(500).json({ success: false, data: queryErr, message: "Database Query Error" });
      }
    });
  } catch (error) {
    logError("Unexpected Error: ", error);
    return res.status(500).json({ success: false, data: error, message: "Unexpected Error, check logs" });
  }
};

export const addProjectShowcase = async (req, res) => {
  let success = false;
  console.log("Headers:", req.headers);
  const userId = req.user.id;
  console.log("User ID:", userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logWarning("Data is not in the right format");
    return res.status(400).json({ success, data: errors.array(), message: "Data is not in the right format" });
  }

  try {
    const { componentName, componentIdName, title, description, gif, techStack } = req.body;

    connectToDatabase(async (err, conn) => {
      if (err) {
        logError("Failed to connect to database");
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }

      try {
        const userQuery = `SELECT UserID, Name FROM Community_User WHERE ISNULL(delStatus, 0) = 0 AND EmailId = ?`;
        const userRows = await queryAsync(conn, userQuery, [userId]);

        if (userRows.length > 0) {
          const user = userRows[0];

          const insertQuery = `INSERT INTO tblCMSContent (
              ComponentName, ComponentIdName, Content, Image, TechStack, AuthAdd, AddOnDt, delStatus
            ) VALUES (?, ?, ?, ?, ?, ?, GETDATE(), 0);`;

          const content = JSON.stringify({ title, description });

          const insertResult = await queryAsync(conn, insertQuery, [
            componentName, componentIdName, content, gif, techStack, user.Name
          ]);

          success = true;
          closeConnection();
          logInfo("Project Showcase added successfully!");

          return res.status(200).json({
            success,
            data: { id: insertResult.insertId },
            message: "Project Showcase added successfully!",
          });
        } else {
          closeConnection();
          logWarning("User not found, please login first.");
          return res.status(400).json({ success: false, data: {}, message: "User not found, please login first." });
        }
      } catch (queryErr) {
        closeConnection();
        logError("Database Query Error:", queryErr);
        return res.status(500).json({ success: false, data: queryErr, message: "Database Query Error" });
      }
    });
  } catch (error) {
    logError("Unexpected Error:", error);
    return res.status(500).json({ success: false, data: error, message: "Unexpected Error, check logs" });
  }
};

export const setActiveParallaxText = async (req, res) => {
  let success = false;
  try {
    connectToDatabase(async (err, conn) => {
      if (err) {
        logError("Failed to connect to database");
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }
      try {
        const { idCode } = req.body;
        await queryAsync(conn, `UPDATE tblCMSContent SET isActive = 0 WHERE ComponentName = 'Parallax'`);
        await queryAsync(conn, `UPDATE tblCMSContent SET isActive = 1 WHERE idCode = ?`, [idCode]);

        success = true;
        closeConnection();
        logInfo("Active parallax text set successfully!");
        return res.status(200).json({
          success,
          message: "Active parallax text set successfully!",
        });
      } catch (queryErr) {
        closeConnection();
        logError("Database Query Error: ", queryErr);
        return res.status(500).json({ success: false, data: queryErr, message: "Database Query Error" });
      }
    });
  } catch (error) {
    logError("Unexpected Error: ", error);
    return res.status(500).json({ success: false, data: error, message: "Unexpected Error, check logs" });
  }
};

export const getParallaxContent = async (req, res) => {
  let success = false;
  try {
    connectToDatabase(async (err, conn) => {
      if (err) {
        logError("Failed to connect to database");
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }
      try {
        const query = `SELECT idCode, ComponentName, ComponentIdName, Content, isActive  FROM tblCMSContent  WHERE ComponentName = 'Parallax' AND ISNULL(delStatus, 0) = 0 `;
        const results = await queryAsync(conn, query);
        console.log("Query result:", results);

        success = true;
        closeConnection();
        logInfo("Parallax content fetched successfully!");

        return res.status(200).json({
          success,
          data: results,
          message: "Parallax content fetched successfully!",
        });
      } catch (queryErr) {
        closeConnection();
        logError("Database Query Error: ", queryErr);
        return res.status(500).json({ success: false, data: queryErr, message: "Database Query Error" });
      }
    });
  } catch (error) {
    logError("Unexpected Error: ", error);
    return res.status(500).json({ success: false, data: error, message: "Unexpected Error, check logs" });
  }
};

export const getContent = async (req, res) => {
  let success = false;
  try {
    connectToDatabase(async (err, conn) => {
      if (err) {
        logError("Failed to connect to database");
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }
      try {
        const query = `SELECT idCode, ComponentName, ComponentIdName, Content, Image,isActive  FROM tblCMSContent  WHERE ComponentName = 'ContentSection' AND ISNULL(delStatus, 0) = 0 `;
        const results = await queryAsync(conn, query);
        console.log("Query result:", results);

        success = true;
        closeConnection();
        logInfo("Parallax content fetched successfully!");

        return res.status(200).json({
          success,
          data: results,
          message: "Parallax content fetched successfully!",
        });
      } catch (queryErr) {
        closeConnection();
        logError("Database Query Error: ", queryErr);
        return res.status(500).json({ success: false, data: queryErr, message: "Database Query Error" });
      }
    });
  } catch (error) {
    logError("Unexpected Error: ", error);
    return res.status(500).json({ success: false, data: error, message: "Unexpected Error, check logs" });
  }
};

export const updateContentSection = async (req, res) => {
  let success = false;
  console.log("Headers:", req.headers);
  const userId = req.user.id; // Ensure user authentication
  console.log("User ID:", userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, data: errors.array(), message: "Data is not in the right format" });
  }

  try {
    const { id, title, text, image } = req.body; // Extract content details

    if (!id) {
      return res.status(400).json({ success, message: "Content ID is required" });
    }

    connectToDatabase(async (err, conn) => {
      if (err) {
        return res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
      }

      try {
        const checkQuery = `SELECT * FROM tblCMSContent WHERE idCode = ? AND ISNULL(delStatus, 0) = 0`;
        const checkRows = await queryAsync(conn, checkQuery, [id]);

        if (checkRows.length === 0) {
          return res.status(404).json({ success, message: "Content not found or already deleted" });
        }

        const updatedContent = JSON.stringify({ title, text });
        const updateQuery = `
         UPDATE tblCMSContent SET  Content = ?, Image = ?, editOnDt = GETDATE() WHERE idCode = ? AND ISNULL(delStatus, 0) = 0`;

        const updateResult = await queryAsync(conn, updateQuery, [updatedContent, image, id]);

        if (updateResult.affectedRows > 0) {
          success = true;
          return res.status(200).json({ success, message: "Content updated successfully" });
        } else {
          return res.status(400).json({ success, message: "Failed to update content" });
        }
      } catch (error) {
        console.error("Database Query Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error });
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};
