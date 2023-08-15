import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Recherchons si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "L'utilisateur n'existe pas" },
        { status: 400 }
      );
    }
    // comparons le mot de passse entrer à celuiq qui existe dans la base de données
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Créons les donnée à utiliser pour la création du token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // Créons le token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
