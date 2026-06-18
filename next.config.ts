import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler disabled — incompatible with framer-motion v12,
  // @react-three/fiber v9, and @splinetool/react-spline v4 at runtime.
  // It rewrites hook internals in ways these animation/3D libs do not expect.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com"   },
    ],
  },
};

export default nextConfig;
