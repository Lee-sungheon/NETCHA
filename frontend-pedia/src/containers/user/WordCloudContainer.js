import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listTags } from "../../modules/tags";
import WordCloud from "../../components/user/WordCloud";

const WordCloudContainer = () => {
  const dispatch = useDispatch();
  const { userId, tags, error, loading } = useSelector(({ user, tags, loading }) => ({
    userId: user.user.userId,
    tags: tags.tags,
    error: tags.error,
    loading: loading["tags/LIST_TAGS"],
  }));
  useEffect(() => {
    dispatch(listTags({userId}));
  }, [dispatch]);

  return (
    <WordCloud tags={tags} error={error} loading={loading} />
  );
};

export default withRouter(WordCloudContainer);
