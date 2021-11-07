using System.Collections.Generic;

namespace Data.Roles
{
    public class Roles
    {
        public static List<string> List = new List<string>
        {
            Administrator,
            Developer,
            Tester,
            ProjectManager
        };

        public const string Administrator = "Administrator";
        public const string Developer = "Developer";
        public const string Tester = "Tester";
        public const string ProjectManager = "ProjectManager";
    }
}
