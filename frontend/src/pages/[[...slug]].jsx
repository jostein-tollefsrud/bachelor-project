import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import {
  employeeList,
  latestEventsCards,
  latestNewsCards,
} from '../lib/dynamicZone/latest-cards';
import { getPage, getPageDynamicZone } from '../lib/pages';

// Dynamic imports
const DynamicEventCard = dynamic(() =>
  import('../components/EventCard/EventCard')
);

const DynamicBackButton = dynamic(() =>
  import('../components/BackButton/BackButton')
);

const DynamicFormMarkdown = dynamic(() =>
  import('../components/FormMarkdown/FormMarkdown')
);

const DynamicEmbed = dynamic(() => import('../components/Embed/Embed'));

const DynamicMarkdown = dynamic(() =>
  import('../components/Markdown/Markdown')
);

const DynamicStaffBox = dynamic(() =>
  import('../components/StaffBox/StaffBox')
);

const DynamicEmployeeCard = dynamic(() =>
  import('../components/EmployeeCard/EmployeeCard')
);

const DynamicHighlightedFlexList = dynamic(() =>
  import('../components/HighlightedFlexList/HighlightedFlexList')
);

const DynamicIconCard = dynamic(() =>
  import('../components/IconCard/IconCard')
);

const DynamicAllNewsList = dynamic(() =>
  import('../components/AllNewsList/AllNewsList')
);

const DynamicAllEventsList = dynamic(() =>
  import('../components/AllEventsList/AllEventsList')
);

const DynamicNewsCard = dynamic(() =>
  import('../components/NewsCard/NewsCard')
);

const DynamicContactForm = dynamic(() =>
  import('../components/Forms/ContactForm')
);

const DynamicBookingForm = dynamic(() =>
  import('../components/Forms/BookingForm')
);

const DynamicJobApplicationForm = dynamic(() =>
  import('../components/Forms/JobApplicationForm')
);

const DynamicOpeningHours = dynamic(() =>
  import('../components/OpeningHours/OpeningHours')
);

const DynamicPageNotFound = dynamic(() =>
  import('../components/PageNotFound/PageNotFound')
);

const DynamicGridContainer = dynamic(() =>
  import('../components/GridContainer/GridContainer')
);

const DynamicGridItem = dynamic(() =>
  import('../components/GridItem/GridItem')
);

const DynamicMainContainer = dynamic(() =>
  import('../components/MainContainer/MainContainer')
);

const DynamicFrequentlyAsked = dynamic(() =>
  import('../components/FrequentlyAsked/FrequentlyAsked')
);

import CustomHeader from '../components/CustomHeader/CustomHeader';
import CustomHead from '../components/CustomHead/CustomHead';

// Material-UI components
const DynamicContainer = dynamic(() => import('@mui/material/Container'));
const DynamicStack = dynamic(() => import('@mui/material/Stack'));

const DynamicPage = ({
  page,
  error,
  latestEvents,
  latestNews,
  dynamicZoneData,
  listEmployees,
}) => {
  const router = useRouter();

  if (error) {
    return <DynamicPageNotFound />;
  }

  const { header, seo, showOpeningHours } = page.attributes;
  const { dynamicZone } = dynamicZoneData.attributes;

  try {
    return (
      <>
        <CustomHead seo={seo} />
        <CustomHeader header={header} />
        {showOpeningHours && <DynamicOpeningHours />}

        <main>
          {dynamicZone.map((zone, index) => {
            // ============== Latest news/events section ============= //
            if (zone.__component === 'blocks.latest-cards') {
              if (zone.TypeOfCards === 'LatestEvents') {
                const cards = latestEvents.map((event) => (
                  <DynamicGridItem key={event.id}>
                    <DynamicEventCard event={event.attributes} />
                  </DynamicGridItem>
                ));

                return (
                  <DynamicMainContainer
                    backgroundColor={zone.background_color}
                    key={index}
                  >
                    <h2>{zone.title}</h2>
                    {cards.length === 0 ? (
                      <h3>
                        {router.locale === 'nb'
                          ? 'Ingen nye arrangementer'
                          : 'No new events'}
                      </h3>
                    ) : (
                      <DynamicGridContainer>{cards}</DynamicGridContainer>
                    )}

                    <Link href={zone.link.href}>
                      <a
                        className={
                          zone.link.Type === 'button' ? 'linkBtn' : 'linkAnchor'
                        }
                      >
                        {zone.link.value}
                      </a>
                    </Link>
                  </DynamicMainContainer>
                );
              }
              if (zone.TypeOfCards === 'LatestNews') {
                const cards = latestNews.map((news) => (
                  <DynamicGridItem key={news.id}>
                    <DynamicNewsCard news={news.attributes} />
                  </DynamicGridItem>
                ));
                return (
                  <DynamicMainContainer
                    backgroundColor={zone.background_color}
                    key={index}
                  >
                    <h2>{zone.title}</h2>
                    {latestNews.length === 0 ? (
                      <h3>
                        {router.locale === 'nb' ? 'Ingen nyheter' : 'No news'}
                      </h3>
                    ) : (
                      <DynamicGridContainer>{cards}</DynamicGridContainer>
                    )}

                    <Link href={zone.link.href}>
                      <a
                        className={
                          zone.link.Type === 'button' ? 'linkBtn' : 'linkAnchor'
                        }
                      >
                        {zone.link.value}
                      </a>
                    </Link>
                  </DynamicMainContainer>
                );
              }
            }
            // ======================================================= //
            // *
            // *
            // *
            // ================ All news/events section ============== //

            if (zone.__component === 'blocks.all-news-events-list') {
              if (zone.type === 'Events') {
                return (
                  <DynamicAllEventsList
                    backgroundColor={zone.background_color}
                    key={index}
                  />
                );
              }

              if (zone.type === 'News') {
                return (
                  <DynamicAllNewsList
                    backgroundColor={zone.background_color}
                    key={index}
                  />
                );
              }
            }
            // ======================================================= //
            // *
            // *
            // *
            // ================ Highlighted flex list ================ //
            if (zone.__component === 'blocks.highlighted-flex-list') {
              return (
                <DynamicHighlightedFlexList
                  backgroundColor={zone.background_color}
                  title={zone.title}
                  infoCard={zone.InfoCard}
                  fontColor={zone.font_color}
                  key={index}
                >
                  {zone.InfoCard.map((card) => (
                    <DynamicIconCard
                      fontColor={zone.font_color}
                      key={card.id}
                      card={card}
                    />
                  ))}
                </DynamicHighlightedFlexList>
              );
            }
            // ======================================================= //
            // *
            // *
            // *
            // ====================== Staff Box ====================== //
            if (zone.__component === 'blocks.staff-box') {
              const employees = listEmployees.map((e) => (
                <DynamicEmployeeCard key={e.id} employee={e} />
              ));

              return (
                <DynamicStaffBox
                  title={zone.title}
                  icon={zone.icon}
                  key={index}
                >
                  {employees}
                </DynamicStaffBox>
              );
            }
            // ======================================================= //
            // *
            // *
            // *
            // ====================== markdown ====================== //

            if (zone.__component === 'blocks.markdown') {
              return (
                <DynamicMarkdown
                  content={zone.content}
                  key={index}
                  backgroundColor={zone.background_color}
                  fontColor={zone.font_color}
                />
              );
            }
            // ======================================================= //
            // *
            // *
            // *
            // ====================== embed ====================== //

            if (zone.__component === 'blocks.embed') {
              return <DynamicEmbed content={zone.content} key={index} />;
            }
            // ======================================================= //
            // *
            // *
            // *
            // ====================== Forms ====================== //
            if (zone.__component === 'blocks.form-markdown') {
              let uniqueKey = zone.type;
              return (
                <DynamicMainContainer key={index}>
                  <DynamicStack
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    alignItems="center"
                  >
                    <DynamicFormMarkdown content={zone.content} key={index} />
                    {zone.type === 'Contact' && (
                      <DynamicContactForm key={uniqueKey} />
                    )}
                    {zone.type === 'Booking' && (
                      <DynamicBookingForm key={uniqueKey} />
                    )}
                    {zone.type === 'JobApplication' && (
                      <DynamicJobApplicationForm key={uniqueKey} />
                    )}
                  </DynamicStack>
                </DynamicMainContainer>
              );
            }
            // ======================================================= //
            // *
            // *
            // *
            // ====================== BackButton ====================== //
            if (zone.__component === 'component.back-button') {
              if (zone.haveBackButton === true)
                return (
                  <DynamicContainer>
                    <DynamicBackButton />
                  </DynamicContainer>
                );
            }
            // ======================================================= //
            // *
            // *
            // *
            // ====================== FAQ accordion ====================== //
            if (zone.__component === 'blocks.accordion') {
              return (
                <DynamicMainContainer
                  key={index}
                  backgroundColor={zone.background_color}
                >
                  {zone?.title && <h2>{zone?.title}</h2>}
                  {zone?.accordion_data?.map((item) => (
                    <DynamicFrequentlyAsked
                      key={item.id}
                      head={item.head}
                      body={item.body}
                    />
                  ))}
                </DynamicMainContainer>
              );
            }
            // ======================================================= //
          })}
        </main>
      </>
    );
  } catch (error) {
    return (
      <div>
        <h1>Error med siden</h1>
      </div>
    );
  }
};

export const getServerSideProps = async ({ query, locale }) => {
  const slug = query.slug ? query.slug.toString() : '/';
  const data = await getPage(slug, locale); // -> [{}]
  const page = data?.data[0]; // [{}] -> {}

  // if no page data, send an error to not crash the site
  if (!page) {
    return {
      props: {
        error: 'oops',
      },
    };
  }

  // only fetch data to be used in dynamic zone if there is a dynamic zone
  if (page.attributes.dynamicZone) {
    var latestNews = await latestNewsCards(page.attributes.dynamicZone, locale);

    var latestEvents = await latestEventsCards(
      page.attributes.dynamicZone,
      locale
    );
    var listEmployees = await employeeList(page.attributes.dynamicZone, locale);
    var dynamicZoneData = await getPageDynamicZone(slug, locale);
    dynamicZoneData = dynamicZoneData.data[0];
  }

  return {
    props: {
      page,
      locale,
      latestEvents,
      latestNews,
      dynamicZoneData,
      listEmployees,
    },
  };
};

export default DynamicPage;
