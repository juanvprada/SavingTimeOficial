"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const models_1 = require("../models");
class RoleController {
    static updateUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin') {
                return res.status(403).json({
                    message: 'Acceso denegado'
                });
            }
            const { id } = req.params;
            const { role } = req.body;
            try {
                const userToUpdate = yield models_1.User.findByPk(id);
                if (!userToUpdate) {
                    return res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                }
                yield userToUpdate.update({ role });
                return res.json({
                    message: 'Rol de usuario actualizado con éxito'
                });
            }
            catch (error) {
                console.error('Error al actualizar rol:', error);
                return res.status(500).json({
                    message: 'Error al actualizar el rol del usuario',
                    error
                });
            }
        });
    }
}
exports.RoleController = RoleController;
