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
const app = (0, express_1.default)();
const swaggerDocument = yamljs_1.default.load(path_1.default.join('src', 'docs', 'swagger.yaml'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/api/teachers', teacherRoutes_1.default);
app.use('/api/classes', classRoutes_1.default);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
});
const start = async () => {
    try {
        database_1.sequelize.authenticate()
            .then(() => console.log("DB connected successfully!"))
            .catch(err => console.error("Unable to connect to DB:", err));
        await database_1.sequelize.sync({ alter: true });
        console.log('Database connected');
        app.listen(3001, () => {
            console.log('Server running on port 3001');
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
console.log("🌍 process.env:", process.env);
start();
//# sourceMappingURL=server.js.map