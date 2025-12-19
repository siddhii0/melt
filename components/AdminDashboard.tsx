import React from 'react';
import type { User, Collection, MoodEntry } from '../types';

interface AdminDashboardProps {
  currentUser: User;
  users: User[];
  collections: Collection[];
  history: MoodEntry[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, users, collections, history }) => {
  // Filter out the admin user from the list to not display their own data
  const otherUsers = users.filter(u => u.id !== currentUser.id);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Overview of all user activity.</p>
      </div>

      <div className="space-y-12">
        {otherUsers.map(user => {
          const userCollections = collections.filter(c => c.userId === user.id);
          const userHistory = history.filter(h => h.userId === user.id);

          return (
            <section key={user.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
              <h2 className="text-2xl font-bold font-serif text-indigo-700">
                User: <span className="font-mono">{user.username}</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                {/* User Collections */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Saved Collections ({userCollections.length})</h3>
                  {userCollections.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {userCollections.map(collection => (
                        <div key={collection.id} className="bg-white p-3 rounded shadow-sm">
                          <p className="font-bold text-gray-800">{collection.name}</p>
                          <ul className="list-disc list-inside mt-2 space-y-1 pl-2 text-sm text-gray-600">
                            {collection.recipes.map(recipe => (
                              <li key={recipe.id}>{recipe.title}</li>
                            ))}
                            {collection.recipes.length === 0 && <li className="list-none italic">No recipes in this collection.</li>}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No collections saved.</p>
                  )}
                </div>

                {/* User Journal */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Journal Entries ({userHistory.length})</h3>
                   {userHistory.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {userHistory.map(entry => (
                         <div key={entry.id} className="bg-white p-3 rounded shadow-sm">
                           <p className="font-bold text-gray-800">{entry.mood}</p>
                           <p className="text-xs text-gray-500 mb-2">{new Date(entry.date).toLocaleString()}</p>
                           <blockquote className="border-l-2 border-gray-300 pl-2 text-sm italic text-gray-600">
                            "{entry.journalText}"
                           </blockquote>
                         </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No journal entries saved.</p>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {otherUsers.length === 0 && (
             <div className="text-center max-w-lg mx-auto py-16">
                <h2 className="text-2xl font-bold font-serif mb-4 text-gray-700">No Other Users Found</h2>
                <p className="text-lg text-gray-500">
                    Once new users sign up, their activity will appear here.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
