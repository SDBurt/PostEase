'use server'

import { Schedule } from "@prisma/client"

import { db } from "@/lib/db"

import { getCurrentUser } from "@/lib/session"

type getScheduleReturnType = Pick<Schedule, "id" | "title" | "schedule" | "isDefault" | "timezone">
type mutateScheduleReturnType = Pick<Schedule, "id">

export async function getSchedule(id: Schedule["id"]): Promise<getScheduleReturnType | null> {
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
      select: {
        id: true,
        title: true,
        schedule: true,
        isDefault: true,
        timezone: true
      }
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to get schedules")
  }
}



export async function getSchedules(): Promise<getScheduleReturnType[] | null> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.schedule.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        schedule: true,
        isDefault: true,
        timezone: true
      }
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to get schedules")
  }
}

export async function getDefaultSchedules(): Promise<getScheduleReturnType | null> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.schedule.findFirst({
      where: {
        userId: user.id,
        isDefault: true
      },
      select: {
        id: true,
        title: true,
        schedule: true,
        isDefault: true,
        timezone: true
      }
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to get schedules")
  }
}

export async function createSchedule(
  data
): Promise<mutateScheduleReturnType> {
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

export async function updateSchedule(
  id: Schedule["id"],
  data
): Promise<mutateScheduleReturnType> {
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

export async function deleteSchedule(
  scheduleId: Schedule["id"]
): Promise<mutateScheduleReturnType> {
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

export async function getDefaultSchedule(): Promise<getScheduleReturnType | null> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.schedule.findFirst({
      where: {
        userId: user.id,
        isDefault: true
      },
      select: {
        id: true,
        title: true,
        schedule: true,
        isDefault: true,
        timezone: true
      }
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to get default schedules")
  }
}
