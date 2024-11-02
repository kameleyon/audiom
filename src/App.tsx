import { ErrorBoundary } from './components/ErrorBoundary';
import { ContentCreator } from './components/content/ContentCreator';
import { Layout } from './components/layout/Layout';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export default function App() {
  return (
    <ErrorBoundary>
      <SignedIn>
        <Layout>
          <ContentCreator />
        </Layout>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ErrorBoundary>
  );
}