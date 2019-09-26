using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Data.SqlClient;

[assembly: log4net.Config.XmlConfigurator(Watch = true)]
namespace LastWCF
{
    [ServiceBehavior(IncludeExceptionDetailInFaults = true)]
    public class ContactService : IContactService
    {
        public void CreateContact(Contact person)
        {
            var connectString = ConfigurationManager.AppSettings["connectString"];
            IMylogger log = new Log4netUsing();

            var test = new ContactDBWorker(connectString, log);
            /*var test_return = */test.Create(person);

            //return 1;
        }

        public List<Contact> GetContacts()
        {
            var connectString = ConfigurationManager.AppSettings["connectString"];
            IMylogger log = new Log4netUsing();

            var test = new ContactDBWorker(connectString, log);
            List<Contact> toReturn = new List<Contact>();
            try
            {
                toReturn = test.GetContacts();
            }
            catch (SqlException e)
            {
                log.Info("При считывании всех записей из бд таблицы Person произошла ошибка Детали: " + e.ToString());
            }
            return toReturn;
        }

        public List<Contact> GetContactsByFirstName(string firstname)// чтобы вернуть еще и значение amountRestrict, нужно создать класс GetContactsResponse и добавить туда два поля: List<Contact> и int amountRestrict
        {
            var connectString = ConfigurationManager.AppSettings["connectString"];
            var amountRestrict = Convert.ToInt32(ConfigurationManager.AppSettings["amountrestrict"]);
            IMylogger log = new Log4netUsing();

            var test = new ContactDBWorker(connectString, log);
            // ДЛЯ КАЖДОГО МЕТОДА СЕРВИСА TRY CATCH 
            var toReturn = test.GetContactsByFirstName(firstname);
            toReturn = BubbleSorter.BubbleSorterLN(toReturn);
            toReturn = ListContactSlicer.Slice(toReturn, amountRestrict);
            return toReturn;
        }

        public List<Contact> GetContactsByLastName(string lastname)
        {
            var connectString = ConfigurationManager.AppSettings["connectString"];
            var amountRestrict = Convert.ToInt32(ConfigurationManager.AppSettings["amountrestrict"]);

            IMylogger log = new Log4netUsing();

            var test = new ContactDBWorker(connectString, log);
            var toReturn = test.GetContactsByLastName(lastname);
            toReturn = BubbleSorter.BubbleSorterFN(toReturn);
            toReturn = ListContactSlicer.Slice(toReturn,amountRestrict);
            return toReturn;
        }
        public List<List<Contact>> GetContactsByBoth(string fnCommaLN)
        {
            var amountRestrict = Convert.ToInt32(ConfigurationManager.AppSettings["amountrestrict"]);
            // валидацию бы..
            List<List<Contact>> toReturn = new List<List<Contact>>();
            int indexOfChar = fnCommaLN.IndexOf(",");
            var lastname = fnCommaLN.Remove(0, indexOfChar + 1);
            var firstname = fnCommaLN.Remove(indexOfChar);

            var foundByFirstName = GetContactsByFirstName(firstname);
            var foundByLastName = GetContactsByLastName(lastname);

            for (var i = 0; i < foundByFirstName.Count; i++)
            {
                for (var j = 0; j < foundByLastName.Count; j++)
                {
                    bool isSamePerson = foundByFirstName[i].ID == foundByLastName[j].ID;
                    if (isSamePerson)
                    {
                        foundByFirstName.Remove(foundByFirstName[i]);
                        break;
                    }
                }
            }
            foundByFirstName = BubbleSorter.BubbleSorterLN(foundByFirstName);
            foundByFirstName = ListContactSlicer.Slice(foundByFirstName, amountRestrict - 1);

            foundByLastName = BubbleSorter.BubbleSorterFN(foundByLastName);
            foundByLastName = ListContactSlicer.Slice(foundByLastName, amountRestrict - 1);

            toReturn.Add(foundByFirstName);
            toReturn.Add(foundByLastName);

            return toReturn;


        }   

        public void UpdateContact(Contact person)
        {
            var connectString = ConfigurationManager.AppSettings["connectString"];
            IMylogger log = new Log4netUsing();

            var test = new ContactDBWorker(connectString, log);
            test.UpdateContact(person);
        }

        public void DeleteContact(int id)
        {
            var connectString = ConfigurationManager.AppSettings["connectString"];
            IMylogger log = new Log4netUsing();

            var test = new ContactDBWorker(connectString, log);
            test.DeleteContact(id);

        }

        
    }
}
