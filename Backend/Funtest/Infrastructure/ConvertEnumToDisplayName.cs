using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Infrastructure
{
    public static class ConvertEnumToDisplayName
    {
        public static List<string> GetDisplayNames(Type type)
        {
            var displaynames = new List<string>();
            var names = Enum.GetNames(type);
            foreach (var name in names)
            {
                var field = type.GetField(name);
                var customAttributes = field.GetCustomAttributes(typeof(DisplayAttribute), true);

                if (customAttributes.Length == 0)
                {
                    displaynames.Add(name);
                }

                foreach (DisplayAttribute attribute in customAttributes)
                {
                    displaynames.Add(attribute.Name);
                }
            }
            return displaynames;
        }

    }
}
