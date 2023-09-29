import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Movie from "./SwiperListItem.js";
import tmdbApi from "../../api/tmdbApi.ts";
import { movieListsTypes } from "../../types/MovieLists.types";
import { TVSeriesTypes } from "../../types/TVSeries.types";
import { CategoriesTypes } from "../../types/Categories.types";

type Props = {
  id?: string;
  type: movieListsTypes | TVSeriesTypes | "similar";
  category: CategoriesTypes;
};

const SwiperListItems: React.FC<Props> = ({ id, type, category }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (type !== "similar") {
        if (category === "movie") {
          response = await tmdbApi.getMoviesList(type as movieListsTypes, {
            params,
          });
        } else {
          response = await tmdbApi.getTvList(type as TVSeriesTypes, { params });
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }

      setItems(response.results);
    };
    getList();
  }, [category, id, type]);

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        slidesPerView={"auto"}
        spaceBetween={20}
        className="movie-list-swiper"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Movie item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperListItems;