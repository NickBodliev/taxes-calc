import { Layout, MediaCard, Page } from '@shopify/polaris'
import React from 'react'

function contact_developer() {
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <MediaCard
                        title="Getting Started"
                        primaryAction={{ content: 'Learn about getting started', url: 'https://mykola-bodliev.herokuapp.com/' }}
                        description="Discover how Shopify can power up your entrepreneurial journey."
                        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
                    >
                        <img
                            alt=""
                            width="100%"
                            height="100%"
                            style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            }}
                            src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                        />
                    </MediaCard>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default contact_developer
