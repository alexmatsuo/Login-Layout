import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="w-full flex items-center justify-center h-screen">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
