rm -rf app/dist
mkdir app/dist
mkdir app/dist/reference

webpack --config webpack.prod.js

# webpack-dev-server requires you to give an exact path match to it's
# bundle otherwise you'll actually be loading the regular built webpack
# file and wont get any auto-reloading, and you have to run webpack -w
sed 's/app\/demo-bundle.js/demo-bundle.js/g' app/index.html > app/dist/index.html
sed 's/app\/reference-bundle.js/reference-bundle.js/g' app/reference/index.html > app/dist/reference/index.html

cp app/*.css app/dist
cp -R app/fonts app/dist
cp -R app/img app/dist
cp -R app/swagger-files app/dist

# # Copy over CNAME for gh-pages custom domain
# cp app/CNAME app/dist
