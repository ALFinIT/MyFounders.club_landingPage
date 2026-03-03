export default function SurveyPage() {
  return (
    <main className="relative flex min-h-screen justify-center bg-black px-4 py-4 sm:px-6">
      <iframe
        src="/gulf-survey.html"
        title="MyFounders Gulf Survey"
        className="h-[calc(100vh-2rem)] w-full max-w-[1100px] border-0"
        loading="eager"
      />
    </main>
  );
}
