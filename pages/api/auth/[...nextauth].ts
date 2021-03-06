import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user?.name
        ?.split(' ')
        .join('')
        .toLocaleLowerCase();

      session.user.uid = token.sub;

      return session;
    }
  }
});
