"use server"

import type { User, EditableUserData } from "./types"

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("http://13.216.230.146:3001/api/users")
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  return response.json()
}


export async function createUser(userData: EditableUserData): Promise<User> {
  const response = await fetch("http://13.216.230.146:3006/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error("Failed to create user")
  }
  return response.json()
}

export async function deleteUser(userId: number): Promise<boolean> {
  const response = await fetch(`http://13.216.230.146:3002/api/users/${userId}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete user")
  }
  return true
}

export async function editUser(userId: number, userData: EditableUserData): Promise<User> {
  const response = await fetch(`http://13.216.230.146:3003/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error("Failed to edit user")
  }
  return response.json()
}

