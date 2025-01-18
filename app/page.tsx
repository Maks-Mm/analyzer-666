"use client";

import CardBLG from "@/app/components/CardBLG";
import { useEffect, useState } from "react";
import axios from "axios";

// Определение типа для пользователя
interface User {
  _id: string;
  name: string;
  email: string;
}

interface Generalization {
  _id: string;
  content: String;
  siteName: String;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]); // Состояние для хранения пользователей
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние для ошибок
  const [generalizations, setGeneralizations] = useState<Generalization[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("/api/users"); // Запрос на получение пользователей с помощью Axios
        setUsers(response.data); // Сохраняем пользователей в состояние
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Ошибка при загрузке"
        ); // Сохраняем сообщение об ошибке
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    const fetchGeneralization = async () => {
      try {
        const response = await axios.get<any[]>("/api/generalizations");
        setGeneralizations(response.data);
        console.log(response.data,"token")
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Ошибка при загрузке"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    fetchGeneralization();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CardBLG />
      <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {loading && <p>Загрузка пользователей...</p>}{" "}
        {/* Сообщение о загрузке */}
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Сообщение об ошибке */}
        {generalizations.length > 0 ? (
          <div className="generalizations">{generalizations.map((g)=>g.content)}</div>
        ) : (
          <div>not generalizations</div>
        )}
        {users.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b">Имя</th>
                <th className="border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>Пользователи не найдены.</p> // Сообщение если нет пользователей
        )}
      </div>
    </div>
  );
}
