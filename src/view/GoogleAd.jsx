import React, { Component } from "react";
import PropTypes from "prop-types";

const googleAdId = "ca-pub-9552396768426571";

class GoogleAd extends Component {
  googleInit = null;

  componentDidMount() {
    const { timeout } = this.props;
    this.googleInit = setTimeout(() => {
      if (typeof window !== "undefined")
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, timeout);
  }

  componentWillUnmount() {
    if (this.googleInit) clearTimeout(this.googleInit);
  }

  render() {
    const { classNames, slot } = this.props;
    return (
      <div className={classNames}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={googleAdId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
}

GoogleAd.propTypes = {
  classNames: PropTypes.string,
  slot: PropTypes.string,
  timeout: PropTypes.number,
};

GoogleAd.defaultProps = {
  classNames: "",
  timeout: 200,
};

export default GoogleAd;
