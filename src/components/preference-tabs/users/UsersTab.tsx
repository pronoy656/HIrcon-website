"use client";

import React, { useState } from "react";
import { User, UploadCloud, X, Trash2 } from "lucide-react";
import { InputField } from "../../common/InputField";
import { SelectField } from "../../common/SelectField";
import { Table } from "../../common/Table";

type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
};

export function UsersTab() {
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, firstName: "John", lastName: "Doe", username: "johndoe", email: "john@example.com", role: "Admin" },
    { id: 2, firstName: "Jane", lastName: "Smith", username: "janesmith", email: "jane@example.com", role: "User" }
  ]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [copyTicket, setCopyTicket] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleCreateUser = () => {
    if (!firstName || !lastName || !username || !email) return;
    
    const newUser: UserData = {
      id: Date.now(),
      firstName,
      lastName,
      username,
      email,
      role: role || "User"
    };
    
    setUsers([...users, newUser]);
    
    // Reset form
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setRole("");
    setCopyTicket(false);
    setProfileImage(null);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-10">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Users</h2>
        <p className="text-gray-500">Manage user accounts and access levels.</p>
      </div>

      {/* Add New User */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Add New User</h3>
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Profile Image Column */}
          <div className="flex flex-col items-center gap-6 w-full lg:w-1/4 pt-2">
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setProfileImage(URL.createObjectURL(file));
                  }
                }}
              />
              <button 
                onClick={() => !profileImage && fileInputRef.current?.click()}
                className="w-48 h-48 bg-white rounded-full border-2 border-dashed border-gray-300 hover:border-[#081b4c] flex items-center justify-center overflow-hidden shadow-sm relative transition-colors focus:outline-none focus:ring-2 focus:ring-[#081b4c]/50 focus:ring-offset-2 cursor-pointer"
                title={profileImage ? "" : "Click to upload profile image"}
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#081b4c] transition-colors">
                    <UploadCloud className="w-12 h-12" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-center">Click to upload</span>
                  </div>
                )}
              </button>

              {profileImage && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="absolute top-2 right-2 bg-white text-red-500 hover:text-white hover:bg-red-500 p-1.5 rounded-full shadow-md border border-gray-100 transition-all z-10"
                  title="Remove Profile Image"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Form Column */}
          <div className="flex-1 space-y-6 lg:pl-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <InputField 
                label="First Name:" 
                placeholder="First name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputField 
                label="Last Name:" 
                placeholder="Last name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <InputField 
                label="Username:" 
                placeholder="Username" 
                containerClassName="md:col-span-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField 
                label="Email:" 
                type="email" 
                placeholder="Email address" 
                containerClassName="md:col-span-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SelectField 
                label="Role:" 
                placeholder="Select role" 
                options={[
                  {value: "Admin", label: "Admin"}, 
                  {value: "Manager", label: "Manager"}, 
                  {value: "User", label: "User"}
                ]} 
                containerClassName="md:col-span-2"
                value={role}
                onChange={(value) => setRole(value)}
              />
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                  Copy Account Holder into Raised Ticket Emails :
                </span>
                <input 
                  type="checkbox" 
                  checked={copyTicket}
                  onChange={(e) => setCopyTicket(e.target.checked)}
                  className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
                />
              </label>
            </div>

            <div className="flex justify-start">
              <button 
                onClick={handleCreateUser}
                className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm uppercase tracking-wide"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Users */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-10">
        <h3 className="text-lg font-bold text-gray-800 mb-6 bg-[#1a2f4c] text-white w-fit px-4 py-2 rounded-md">Manage Users</h3>
        <div className="bg-white rounded-md border border-gray-200 overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a2f4c] text-white">
                <th className="px-4 py-3 text-sm font-semibold">First Name</th>
                <th className="px-4 py-3 text-sm font-semibold">Last Name</th>
                <th className="px-4 py-3 text-sm font-semibold">Username</th>
                <th className="px-4 py-3 text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-sm font-semibold">Role</th>
                <th className="px-4 py-3 text-sm font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{user.firstName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{user.lastName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{user.username}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{user.role}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500 text-sm">
                    No users found. Create a new user above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Button */}
      <div className="flex justify-end pt-4 pb-12">
        <button className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-3 px-10 rounded-xl transition-colors text-lg shadow-md uppercase tracking-wide">
          UPDATE
        </button>
      </div>

    </div>
  );
}
