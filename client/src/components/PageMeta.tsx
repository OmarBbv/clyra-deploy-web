import { Helmet, HelmetProvider } from "react-helmet-async";

const PageMeta  = ({ title }: { title: string }) => {
    return (
        <HelmetProvider>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            </div>
        </HelmetProvider>
    );
}

export default PageMeta;
