"use client";
import React, { CSSProperties, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "../../../api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";

export default function Login() {
  // const [usernam, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const session = await getServerSession(OPTIONS)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();

  async function signinHandler(e: any) {
    try {
      e.preventDefault();

      const data = {
        username: email,
        password: password,
      };
      console.log(`signinHandler DATA:`, data);
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (result?.ok) {
        console.debug("Successfully signedIn...", result);
        // router.push("/dashboard");
        // window.location.reload()
      } else {
        console.error("FAILED", result);
        setError("Failed to sign in");
      }
    } catch (e) {
      console.error("AUTH", e);
    }
  }

  async function signoutHandler(e: any) {
    try {
      e.preventDefault();
      await signOut();
      router.refresh();
    } catch (e) {
      console.error("AUTH", e);
    }
  }

  const containerStyle: CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
  };

  const cardStyle: CSSProperties = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 700,
  };

  const subtitleStyle: CSSProperties = {
    margin: 0,
    marginBottom: "2rem",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  };

  const formStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const labelStyle: CSSProperties = {
    fontSize: "14px",
    marginBottom: "0.5rem",
    fontWeight: 500,
  };

  const inputStyle: CSSProperties = {
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const buttonStyle: CSSProperties = {
    padding: "0.75rem",
    borderRadius: "4px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  };

  const linksContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  };

  const linkStyle: CSSProperties = {
    fontSize: "14px",
    textDecoration: "none",
    color: "#007bff",
  };

  if (session.status === "authenticated") {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>
            You are <strong>Authenicated</strong>
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <button
              style={{ ...buttonStyle, backgroundColor: "red" }}
              onClick={signoutHandler}
            >
              Sign Out
            </button>
            <a style={buttonStyle} href="/dashboard">
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}> */}
        <h1 style={titleStyle}>Sign In</h1>
        {/* </div> */}
        <p style={subtitleStyle}>
          Enter your credentials to access your account
        </p>

        <form onSubmit={signinHandler} style={formStyle}>
          {/* Email Field */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <label htmlFor="email" style={labelStyle}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Password Field */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Sign In Button */}
          <button type="submit" style={buttonStyle}>
            Sign In
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

        </form>

        {/* Extra Links */}
        {/* <div style={linksContainerStyle}>
              <a href="#forgot" style={linkStyle}>
                Forgot password?
              </a>
              <a href="#register" style={linkStyle}>
                Create account
              </a>
            </div> */}
      </div>
    </div>
  );
}
