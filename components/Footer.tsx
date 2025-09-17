import React from 'react';
import { GlobeIcon } from './icons/CoreIcons';
import { useLocalization } from '../hooks/useLocalization';

const Footer: React.FC = () => {
  const { t } = useLocalization();

  const footerSections = [
    {
      title: t('support'),
      links: [t('help_center'), t('aircover'), t('anti_discrimination'), t('disability_support'), t('cancellation_options'), t('report_neighborhood_concern')],
    },
    {
      title: t('hosting'),
      links: [t('airbnb_your_home_footer'), t('aircover_for_hosts'), t('hosting_resources'), t('community_forum'), t('hosting_responsibly')],
    },
    {
      title: t('airbnb'),
      links: [t('newsroom'), t('new_features'), t('careers'), t('investors'), t('gift_cards')],
    },
  ];

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}><a href="#" className="text-gray-600 hover:underline text-sm">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Airbnb, Inc.</p>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="hover:underline">Terms</a>
              <span className="hidden md:inline">&middot;</span>
              <a href="#" className="hover:underline">Sitemap</a>
              <span className="hidden md:inline">&middot;</span>
              <a href="#" className="hover:underline">Privacy</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center font-semibold hover:underline">
              <GlobeIcon className="h-5 w-5 mr-2" />
              English (US)
            </a>
            <a href="#" className="font-semibold hover:underline">$ USD</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;