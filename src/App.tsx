import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ContactPage } from './pages/ContactPage';
import { ArticleItem, Language, PageId, ProjectItem } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Sync document direction and language code with current language state
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    setSelectedProject(null);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProjectFromAnywhere = (project: ProjectItem) => {
    setSelectedProject(project);
    setCurrentPage('work');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticleFromAnywhere = (article: ArticleItem) => {
    setSelectedArticle(article);
    setCurrentPage('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'fa' : 'en'));
  };

  return (
    <div
      className={`min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950`}
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
    >
      {/* Global Top Bar Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Dynamic Page Container */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProjectFromAnywhere}
            onSelectArticle={handleSelectArticleFromAnywhere}
          />
        )}

        {currentPage === 'work' && (
          <WorkPage
            lang={lang}
            onNavigate={handleNavigate}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'experience' && (
          <ExperiencePage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'articles' && (
          <ArticlesPage
            lang={lang}
            onNavigate={handleNavigate}
            selectedArticle={selectedArticle}
            onSelectArticle={setSelectedArticle}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Studio Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
        onToggleLang={handleToggleLang}
      />
    </div>
  );
}
