"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const classRoutes_1 = __importDefault(require("./routes/classRoutes"));
const database_1 = require("./config/database");
require("./models/Teacher");
require("./models/Class");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const app = (0, express_1.default)();
// Load Swagger YAML file
const swaggerDocument = yamljs_1.default.load(path_1.default.join(process.cwd(), 'src', 'docs', 'swagger.yaml'));
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger docs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// API routes
app.use('/api/teachers', teacherRoutes_1.default);
app.use('/api/classes', classRoutes_1.default);
// Serve static frontend
const publicPath = path_1.default.join(process.cwd(), 'public');
app.use(express_1.default.static(publicPath));
// Handle SPA (for React Router)
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(publicPath, 'index.html'));
});
// Error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
});
// Start server
const start = async () => {
    try {
        await database_1.sequelize.authenticate();
        console.log('DB connected successfully!');
        await database_1.sequelize.sync({ alter: true });
        console.log('Database synced');
        const PORT = process.env.PORT || 3001;
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