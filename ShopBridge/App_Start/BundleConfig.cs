using System.Web;
using System.Web.Optimization;

namespace ShopBridge
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/Scripts/JqueryTable/TableScript").Include(
                        //"~/Scripts/JqueryTable/jquery.dataTables-1.10.5.js"
                        "~/Scripts/JqueryTable/jquery.dataTables-1.10.12.js",
                        "~/Scripts/JqueryTable/jquery.dataTables.buttons.js"
                        //"~/Scripts/JqueryTable/jquery.buttons.flash.js",
                        //"~/Scripts/JqueryTable/jquery.pdfmake.js",
                        //"~/Scripts/JqueryTable/jquery.jszip.js",
                        //"~/Scripts/JqueryTable/jquery.buttons.print.js",
                        //"~/Scripts/JqueryTable/jquery.buttons.html5.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/TableStyle").Include(
                        "~/Content/JqueryTable/jquery.dataTables.css"

                        //"~/Content/JqueryTable/jquery.dataTables-1.10.12.css"
                        ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                        "~/Content/Style.css"
                      //"~/Content/site.css"
                      ));
        }
    }
}
