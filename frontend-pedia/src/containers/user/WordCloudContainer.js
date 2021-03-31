import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listTags } from "../../modules/tags";
import WordCloud from "../../components/user/WordCloud";

const WordCloudContainer = () => {
  const userId = 99999;
  const dispatch = useDispatch();
  const { tags, error, loading } = useSelector(({ tags, loading }) => ({
    tags: tags.tags,
    error: tags.error,
    loading: loading["tags/LIST_TAGS"],
  }));
  useEffect(() => {
    dispatch(listTags({ userId }));
  }, [dispatch]);

  return (
    <WordCloud tags={tags} error={error} loading={loading} />
  );
};

export default withRouter(WordCloudContainer);
