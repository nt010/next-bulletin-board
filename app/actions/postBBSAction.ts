"use server";

import { z } from "zod";
import { formSchema } from "../bbs-posts/create/page";
import prisma from "../../lib/prismaClient";
import { redirect } from "next/navigation";
import { raevalidatePath } from "next/cache";

export const postBBS = async ({username, title, content}: z.infer<typeof formSchema>) => {
    await prisma.post.create({
        data: {
            username,
            title,
            content,
        }
    });

    revalidatePath("/");
    redirect("/");
}