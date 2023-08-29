'use server'

import { ScheduleType } from "@/types"
import { Post, Schedule, Status } from "@prisma/client"

import { db } from "@/lib/db"

import { getCurrentUser } from "@/lib/session"

export async function getUserSchedule(id: string): Promise<Schedule | null> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.schedule.findUnique({
      where: {
        userId: user.id,
        id: id
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to get schedules")
  }
}

export async function getUserSchedules(): Promise<Schedule[] | null> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.schedule.findMany({
      where: {
        userId: user.id,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to get schedules")
  }
}

export async function createUserSchedule(
  data
): Promise<{ id: Schedule["id"] }> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }
  try {
    return db.schedule.create({
      data: {
        ...data,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to create schedule")
  }
}

export async function updateUserSchedule(
  id: Schedule["id"],
  data
): Promise<{ id: Schedule["id"] }> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return db.schedule.update({
      where: {
        id,
      },
      data: data,
      select: {
        id: true,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to create schedule")
  }
}

export async function deleteUserSchedule(
  scheduleId: Schedule["id"]
): Promise<{ id: Schedule["id"] }> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const result = await db.schedule.delete({
      where: {
        id: scheduleId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })
    return result
  } catch (err) {
    console.error(err)
    throw new Error("Unable to delete schedule")
  }
}

export async function getDefaultSchedule(): Promise<Schedule[] | null> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.schedule.findMany({
      where: {
        userId: user.id,
        isDefault: true
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to get schedules")
  }
}
