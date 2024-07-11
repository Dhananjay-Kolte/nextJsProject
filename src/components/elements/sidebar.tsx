import { getStrapiMediaFromObject } from "@/utils/media";

const SideBar = ({ sidebar, pageContext, organization }: any) => {
  return (
    <div className="flex shadow-2xl shadow-slate-300 transition-shadow bg-fafafa">
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200"></div>
          <div className="flex bg-gray-100  overflow-x-hidden">
            <div className="bg-white lg:flex md:w-64 md:flex-col hidden">
              <div className="flex-col pt-5 flex overflow-y-auto">
                <div className="h-full flex-col justify-between px-4 flex">
                  <div className="mb-10 ml-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="logo"
                      src={
                        getStrapiMediaFromObject(organization?.logo) || ""
                      }></img>
                  </div>
                  <div className="space-y-4">
                    {sidebar.links.map((link: any) => {
                      return (
                        <div
                          key={link.id}
                          className="bg-top bg-cover space-y-1">
                          <a
                            href={link.url}
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2
                                2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>{link.text}</span>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
