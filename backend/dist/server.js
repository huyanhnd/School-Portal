"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const classRoutes_1 = __importDefault(require("./routes/classRoutes"));
const database_1 = require("./config/database");
require("./models/Teacher");
require("./models/Class");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const swaggerDocument = yamljs_1.default.load(path_1.default.join('src', 'docs', 'swagger.yaml'));
const corsOptions = {
    origin: process.env.REACT_APP_API_URL,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; " +
        "font-src 'self'; " +
        `connect-src 'self' ${process.env.REACT_APP_API_URL};`);
    next();
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/api/teachers', teacherRoutes_1.default);
app.use('/api/classes', classRoutes_1.default);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
});
const start = async () => {
    try {
        await database_1.sequelize.authenticate()
            .then(() => console.log("DB connected successfully!"))
            .catch(err => console.error("Unable to connect to DB:", err));
        await database_1.sequelize.sync();
        console.log('Database connected');
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
start();
//# sourceMappingURL=server.js.map