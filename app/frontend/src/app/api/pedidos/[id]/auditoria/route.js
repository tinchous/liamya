import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const logs = await prisma.auditoria.findMany({
    where: { pedidoId: parseInt(params.id) },
    orderBy: { fecha: "desc" }
  });
  return NextResponse.json(logs);
}

export async function POST(request, { params }) {
  const body = await request.json();
  const log = await prisma.auditoria.create({
    data: {
      pedidoId: parseInt(params.id),
      usuario: body.usuario,
      accion: body.accion,
      detalle: body.detalle
    }
  });
  return NextResponse.json(log);
}
