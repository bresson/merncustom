import config from "./../config/config"
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "./../webpack.config.client.js";

/**
 * During development, when we run the server, the Express app should load 
 * the Webpack middleware relevant to the frontend with respect to the 
 * configuration set for the client-side code, so that the frontend and 
 * backend development workflow is integrated.
 */

/**
 *  compile method that takes the Express app and configures it 
 * to use the Webpack middleware
 */
const compile = (app) => {
    if (config.env == "development") {
        const compiler = webpack(webpackConfig);
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        });
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
    }
}

export default {
    compile
}