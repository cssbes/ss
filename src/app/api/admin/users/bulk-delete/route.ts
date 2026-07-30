import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ids, soft } = await req.json();

    if (soft) {
      await prisma.user.updateMany({
        where: { id: { in: ids } },
        data: { deletedAt: new Date() },
      });
    } else {
      await prisma.user.deleteMany({
        where: { id: { in: ids } },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
