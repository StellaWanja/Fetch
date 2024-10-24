import { albumImages1, albumImages2 } from "../../constants";

const Albums = () => {
  return (
    <section id="collections" className=" w-full -z-10">
      <div className="min-h-1/2 bg-green pb-20 c-space">
        <h2 className="text-lightgreen text-4xl sm:text-7xl text-center pb-8">
          View everything in one place
        </h2>
        <p className="text-lightgreen text-lg sm:text-xl text-center w-full lg:w-1/3 mx-auto">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Mus nisi risus
          nunc libero penatibus auctor. Facilisi dignissim fusce tristique
          potenti dignissim ultrices, ad diam.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center py-20">
          {albumImages1.map(({ id, url }) => (
            <div key={id} className="w-full sm:w-1/4 h-[250px] overflow-hidden">
              <img
                src={url}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-1/2 bg-white py-10 c-space">
        <h2 className="text-green text-4xl sm:text-7xl text-center pb-8">
          Find albums effortlessly
        </h2>
        <p className="text-green text-lg sm:text-xl text-center pb-8 w-full lg:w-1/3 mx-auto">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Mus nisi risus
          nunc libero penatibus auctor. Facilisi dignissim fusce tristique
          potenti dignissim ultrices, ad diam.
        </p>
        <h3 className="text-green text-lg sm:text-xl text-center font-semibold">
          Discover more
        </h3>
        <p className="text-green text-lg sm:text-xl text-center w-full lg:w-1/4 mx-auto">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Mus nisi risus
          nunc libero penatibus auctor. Facilisi dignissim fusce
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-20">
          {albumImages2.map(({ id, url }) => (
            <div key={id} className="w-full h-[500px] sm:w-1/4 overflow-hidden">
              <img
                src={url}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Albums;
