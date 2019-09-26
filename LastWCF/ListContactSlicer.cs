using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LastWCF
{
    public static class ListContactSlicer
    {
        public static List<Contact> Slice(List<Contact> people,int amount)
        {
            while (people.Count > amount)
            {
                people.RemoveAt(people.Count - 1);
            }
            return people;
        }

    }
}