import { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Dialog, DialogDescription, DialogPanel, DialogTitle } from '@headlessui/react';

const AccountTables = ({ users, showCommittee }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const currentUserId = parseInt(localStorage.getItem("userId"));
    const currentUserType = parseInt(localStorage.getItem("userType"));
    const adminUsers = users.filter(u => u.userType_id === 2);

    console.log('users: ', users);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setIsOpen(true);
    }

    const closeModal = () => {
        setSelectedUserId(null);
        setIsOpen(false);
    }

    const handleDelete = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${apiUrl}/subdirectorade/users/${selectedUserId}/inactive`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
        setIsLoading(false);
        closeModal();
    }


    return (
        <>
            <div className="overflow-x-auto mb-6!">
                <table className="min-w-full ">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="py-2! px-4! text-left">Nombre</th>
                            <th className="py-2! px-4! text-left">Grado académico</th>
                            <th className="py-2! px-4! text-left">Email</th>
                            {showCommittee && <th className="py-2! px-4! text-left">Comité</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userId} className="hover:bg-gray-50">
                                <td className="py-2! px-4! text-left!">{user.fullName}</td>
                                <td className="py-2! px-4! text-left!">{user.academicDegree}</td>
                                <td className="py-2! px-4! text-left!">{user.email}</td>
                                {showCommittee && <td className="py-2! px-4! text-left!">{user.committeeName}</td>}
                                <td className="py-2! px-4! text-left!">{user.userType_id}</td>
                                <td className="py-2! px-4! text-left!">
                                        <button
                                            className="text-white rounded-lg cursor-pointer px-3! py-1! mr-3! mb-1! bg-[#5CB7E6] hover:bg-[#1591D1]"
                                            onClick={() => console.log(`Editar usuario con ID: ${user.userId}`)}
                                        >
                                            Editar <Pencil className="inline" />
                                        </button>
                                        {/* Reglas para mostrar el botón Eliminar */}
                                        {(user.userType_id === 1 // Investigadores
                                        || (user.userId === currentUserId && currentUserType === 2 && adminUsers.length > 1)) // Eliminarse a sí mismo como admin si hay más de uno
                                        ? (
                                            <button
                                                className="text-white rounded-lg cursor-pointer px-3! py-1! bg-red-500 hover:bg-red-600"
                                                onClick={() => openModal(user.userId)}
                                            >
                                                Eliminar <Trash className="inline" />
                                            </button>
                                        ) : null}
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Confirmación */}
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4!">
                    <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6! shadow-lg">
                        <DialogTitle className="text-lg font-semibold mb-4!">Confirmar eliminación</DialogTitle>
                        <p className='mb-4!'>¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.</p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4! py-2! bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4! py-2! bg-red-500 text-white rounded hover:bg-red-600"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default AccountTables;