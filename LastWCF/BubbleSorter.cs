using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LastWCF
{
    public static class BubbleSorter
    {
        public static List<Contact> BubbleSorterLN(List<Contact> objectData)
        {
            for (var i = 0; i < objectData.Count - 1; i++)
            {
                for (var j = 0; j < objectData.Count - i; i++)
                {
                    int comparison = String.Compare(objectData[j].LastName, objectData[j + 1].LastName, comparisonType: StringComparison.OrdinalIgnoreCase);
                    if (comparison > 0)
                    {
                        var swap = objectData[j];
                        objectData[j] = objectData[j + 1];
                        objectData[j + 1] = swap;
                    }
                }
            }
            return objectData;
        }
        public static List<Contact> BubbleSorterFN(List<Contact> objectData)
        {
            for (var i = 0; i < objectData.Count - 1; i++)
            {
                for (var j = 0; j < objectData.Count - i; i++)
                {
                    int comparison = String.Compare(objectData[j].FirstName, objectData[j + 1].FirstName, comparisonType: StringComparison.OrdinalIgnoreCase);
                    if (comparison > 0)
                    {
                        var swap = objectData[j];
                        objectData[j] = objectData[j + 1];
                        objectData[j + 1] = swap;
                    }
                }
            }
            return objectData;
        }
    }
}